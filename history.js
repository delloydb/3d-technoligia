// History Hero JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Timeline marker interactivity
  const timelineMarkers = document.querySelectorAll('.timeline-marker');
  
  timelineMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
      const period = this.classList.contains('ancient') ? 'ancient' :
                    this.classList.contains('roman') ? 'roman' :
                    this.classList.contains('industrial') ? 'industrial' : 'modern';
      
      // Scroll to corresponding section
      document.getElementById(period + '-era').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Scroll arrow functionality
  const scrollArrow = document.querySelector('.hero-scroll-indicator');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', function() {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }

  // Parallax effect on scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.history-hero');
    if (hero) {
      hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const timelineData = [
    {
      year: "3000 BC",
      title: "First Paved Roads",
      description: "The earliest paved roads were built in Mesopotamia using stone slabs, marking the beginning of organized road construction."
    },
    {
      year: "312 BC",
      title: "Roman Roads",
      description: "The Romans engineered durable roads with proper drainage, using layers of materials - a technique that inspired modern road construction."
    },
    {
      year: "1815",
      title: "Macadam Roads",
      description: "John McAdam introduced crushed stone layers compacted with binder, creating smoother and more durable road surfaces."
    },
    {
      year: "1908",
      title: "Automobile Revolution",
      description: "Mass production of automobiles created demand for paved roads and standardized highway systems across nations."
    },
    {
      year: "1956",
      title: "Interstate Highways",
      description: "The U.S. Interstate Highway System launched, featuring controlled access, multiple lanes, and high-speed travel."
    },
    {
      year: "Present",
      title: "Smart Infrastructure",
      description: "Modern roads incorporate IoT sensors, solar panels, and EV charging, evolving into intelligent transportation systems."
    },
    {
      year: "Future",
      title: "Self-Healing Roads",
      description: "Emerging technologies promise roads with self-repairing materials and embedded energy generation capabilities."
    }
  ];

  // DOM Elements
  const timeline = document.getElementById('timeline');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('timelineDots');

  // State
  let currentIndex = 0;
  let isAnimating = false;

  // Create timeline items
  function createTimeline() {
    timelineData.forEach((item, index) => {
      // Create timeline card
      const timelineItem = document.createElement('div');
      timelineItem.className = `timeline-item ${index === 0 ? 'active' : ''}`;
      timelineItem.innerHTML = `
        <div class="timeline-year">${item.year}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-desc">${item.description}</p>
      `;
      timeline.appendChild(timelineItem);

      // Create navigation dot
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
      
      // Dot click event
      dot.addEventListener('click', () => {
        if (!isAnimating && currentIndex !== index) {
          goToIndex(index);
        }
      });
    });
  }

  // Update UI state
  function updateUI() {
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.dot');
    
    // Update active classes
    items.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === timelineData.length - 1;
    
    // Scroll to active item
    scrollToCurrentItem();
  }

  // Smooth scroll to current item
  function scrollToCurrentItem() {
    isAnimating = true;
    const container = timeline;
    const item = document.querySelectorAll('.timeline-item')[currentIndex];
    
    container.scrollTo({
      left: item.offsetLeft - container.offsetLeft - (container.offsetWidth / 2 - item.offsetWidth / 2),
      behavior: 'smooth'
    });
    
    // Reset animation flag after scroll completes
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Navigate to specific index
  function goToIndex(index) {
    if (index >= 0 && index < timelineData.length) {
      currentIndex = index;
      updateUI();
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    if (!isAnimating && currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (!isAnimating && currentIndex < timelineData.length - 1) {
      goToIndex(currentIndex + 1);
    }
  });

  // Initialize
  createTimeline();
  updateUI();

  // Handle window resize
  window.addEventListener('resize', () => {
    scrollToCurrentItem();
  });
});









// Footer JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year automatically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Simple form submission handler
  const footerForm = document.querySelector('.footer-form');
  if (footerForm) {
    footerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email && email.includes('@')) {
        // In a real implementation, you would send this to your newsletter service
        console.log('Subscribed email:', email);
        emailInput.value = '';
        alert('Thank you for subscribing!');
      } else {
        alert('Please enter a valid email address');
      }
    });
  }
  
  // Animate elements on scroll
  const footerCols = document.querySelectorAll('.footer-col');
  
  function animateOnScroll() {
    footerCols.forEach((col, index) => {
      const rect = col.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.8);
      
      if (isVisible) {
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize animation state
  footerCols.forEach((col, index) => {
    col.style.opacity = '0';
    col.style.transform = 'translateY(30px)';
    col.style.transition = `all 0.6s ease ${index * 0.1}s`;
  });
  
  // Check on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});