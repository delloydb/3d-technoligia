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

// Gallery Functionality
function initGallery() {
  const galleryData = [
    {
      id: 1,
      title: "Roman Appian Way",
      era: "ancient",
      image: "4.jpg",
      description: "One of the earliest and most strategically important Roman roads, built in 312 BC."
    },
    {
      id: 2,
      title: "Inca Road System",
      era: "ancient",
      image: "2.jpg",
      description: "The extensive pre-Columbian network that connected the Inca Empire across South America."
    },
    {
      id: 3,
      title: "Medieval Cobbled Streets",
      era: "medieval",
      image: "1.jpg",
      description: "Characteristic stone-paved roads found in European towns during the Middle Ages."
    },
    {
      id: 4,
      title: "Silk Road Pathway",
      era: "medieval",
      image: "3.jpg",
      description: "The ancient trade route connecting East and West, vital for cultural exchange."
    },
    {
      id: 5,
      title: "First Macadam Road",
      era: "modern",
      image: "4.jpg",
      description: "John McAdam's revolutionary road construction technique from the early 19th century."
    },
    {
      id: 6,
      title: "Early Asphalt Pavement",
      era: "modern",
      image: "3.jpg",
      description: "The first modern asphalt roads appeared in the late 19th century."
    },
    {
      id: 7,
      title: "U.S. Interstate System",
      era: "modern",
      image: "1.jpg",
      description: "The Eisenhower Interstate System revolutionized long-distance travel in America."
    },
    {
      id: 8,
      title: "Modern Smart Highway",
      era: "modern",
      image: "2.jpg",
      description: "Contemporary roads with embedded sensors and sustainable energy features."
    }
  ];

  // DOM Elements
  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxTitle = document.querySelector('.image-title');
  const lightboxEra = document.querySelector('.image-era');
  const lightboxDesc = document.querySelector('.image-description');
  const closeBtn = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // State
  let currentFilter = 'all';
  let currentItems = [];
  let currentLightboxIndex = 0;

  // Initialize Gallery
  function renderGallery() {
    galleryGrid.innerHTML = '';
    
    const filteredItems = currentFilter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.era === currentFilter);
    
    currentItems = filteredItems;
    
    filteredItems.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.dataset.era = item.era;
      galleryItem.dataset.index = index;
      
      galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="gallery-image">
        <div class="item-overlay">
          <h3 class="item-title">${item.title}</h3>
          <span class="item-era">${formatEra(item.era)}</span>
        </div>
      `;
      
      galleryItem.addEventListener('click', () => openLightbox(index));
      galleryGrid.appendChild(galleryItem);
    });
  }

  // Format era for display
  function formatEra(era) {
    return {
      ancient: 'Ancient',
      medieval: 'Medieval',
      modern: 'Modern'
    }[era] || era;
  }

  // Lightbox Functions
  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = currentItems[currentLightboxIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxEra.textContent = formatEra(item.era);
    lightboxDesc.textContent = item.description;
  }

  function navigateLightbox(direction) {
    if (direction === 'prev' && currentLightboxIndex > 0) {
      currentLightboxIndex--;
    } else if (direction === 'next' && currentLightboxIndex < currentItems.length - 1) {
      currentLightboxIndex++;
    }
    updateLightbox();
  }

  // Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGallery();
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox('prev'));
  nextBtn.addEventListener('click', () => navigateLightbox('next'));

  // Close lightbox when clicking outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox('prev');
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next');
    }
  });

  // Initial render
  renderGallery();
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Key Innovations Accordion
function initInnovations() {
  const innovationsData = [
    {
      id: 1,
      title: "Roman Layered Road Construction",
      year: "300 BC",
      description: "The Romans developed sophisticated multi-layer road construction techniques using stones, gravel, and sand that provided durability and drainage. Their roads remained usable for centuries and became models for modern road construction.",
      image: "2.jpg",
      visualCaption: "Cross-section of a typical Roman road showing multiple layers"
    },
    {
      id: 2,
      title: "Macadam Pavement",
      year: "1815",
      description: "John Loudon McAdam introduced the revolutionary 'macadam' technique using compacted crushed stone layers. This method created smoother, more durable roads that could withstand heavier loads and variable weather conditions.",
      image: "1.jpg",
      visualCaption: "Illustration of macadam road construction process"
    },
    {
      id: 3,
      title: "Modern Asphalt Concrete",
      year: "1870",
      description: "The development of asphalt concrete (a mixture of bitumen and mineral aggregates) created waterproof, flexible, and smooth road surfaces. This became the standard for modern paved roads and highways.",
      image: "3.jpg",
      visualCaption: "Modern asphalt laying equipment at work"
    },
    {
      id: 4,
      title: "Reinforced Concrete Roads",
      year: "1891",
      description: "The first reinforced concrete road was built in Ohio, combining concrete's durability with steel's tensile strength. This innovation enabled longer-lasting road surfaces for heavy traffic areas.",
      image: "4.jpg",
      visualCaption: "Reinforced concrete road cross-section diagram"
    },
    {
      id: 5,
      title: "Interstate Highway System",
      year: "1956",
      description: "The U.S. Interstate Highway System introduced standardized design with controlled access, multiple lanes, and grade separations. This became the model for high-speed, high-capacity road networks worldwide.",
      image: "1.jpg",
      visualCaption: "Aerial view of a modern interstate highway interchange"
    }
  ];

  // DOM Elements
  const accordion = document.getElementById('innovationAccordion');
  const visualContainer = document.getElementById('innovationVisual');
  let activeItem = null;

  // Create Accordion Items
  function createAccordion() {
    innovationsData.forEach((item, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      accordionItem.dataset.id = item.id;
      
      accordionItem.innerHTML = `
        <div class="accordion-header">
          <div>
            <h3 class="accordion-title">${item.title}</h3>
            <span class="accordion-year">${item.year}</span>
          </div>
          <div class="accordion-icon"></div>
        </div>
        <div class="accordion-content">
          <p class="accordion-description">${item.description}</p>
          <img src="${item.image}" alt="${item.title}" class="accordion-image">
        </div>
      `;
      
      accordionItem.addEventListener('click', () => toggleAccordion(item, index));
      accordion.appendChild(accordionItem);
      
      // Set first item as active by default
      if (index === 0) {
        accordionItem.classList.add('active');
        updateVisual(item);
        activeItem = 0;
      }
    });
  }

  // Toggle Accordion Item
  function toggleAccordion(item, index) {
    const allItems = document.querySelectorAll('.accordion-item');
    
    if (activeItem === index) {
      allItems[index].classList.remove('active');
      activeItem = null;
    } else {
      allItems.forEach(item => item.classList.remove('active'));
      allItems[index].classList.add('active');
      activeItem = index;
      updateVisual(item);
    }
  }

  // Update Visual Representation
  function updateVisual(item) {
    visualContainer.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="visual-image">
      <p class="visual-caption active">${item.visualCaption}</p>
    `;
  }

  // Initialize
  createAccordion();
}

// Initialize the innovations section
document.addEventListener('DOMContentLoaded', initInnovations);

// Road Safety Statistics
function initSafetyStats() {
  // Animate statistic counters
  const statValues = document.querySelectorAll('.stat-value');
  
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toFixed(progress < 1 ? 0 : 2);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer for animation triggers
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statValues.forEach(el => {
          const target = parseFloat(el.dataset.target);
          animateValue(el, 0, target, 1500);
        });
        
        // Initialize chart after counters are done
        setTimeout(initSafetyChart, 1600);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.safety-section'));

  // Chart.js Visualization
  function initSafetyChart() {
    const ctx = document.getElementById('safetyChart').getContext('2d');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Chart data
    const chartData = {
      region: {
        labels: ['Africa', 'Americas', 'Eastern Mediterranean', 'Europe', 'South-East Asia', 'Western Pacific'],
        datasets: [{
          data: [26.6, 15.6, 17.4, 9.3, 17.5, 13.6],
          backgroundColor: [
            '#3498db',
            '#e74c3c',
            '#2ecc71',
            '#f39c12',
            '#9b59b6',
            '#1abc9c'
          ],
          borderWidth: 0
        }]
      },
      age: {
        labels: ['0-14 years', '15-29 years', '30-44 years', '45-59 years', '60+ years'],
        datasets: [{
          data: [8, 38, 25, 18, 11],
          backgroundColor: [
            '#3498db',
            '#e74c3c',
            '#2ecc71',
            '#f39c12',
            '#9b59b6'
          ],
          borderWidth: 0
        }]
      },
      type: {
        labels: ['Pedestrians', 'Cyclists', 'Motorcyclists', 'Car Occupants', 'Other'],
        datasets: [{
          data: [23, 6, 28, 29, 14],
          backgroundColor: [
            '#3498db',
            '#e74c3c',
            '#2ecc71',
            '#f39c12',
            '#9b59b6'
          ],
          borderWidth: 0
        }]
      }
    };

    // Chart config
    const chartConfig = {
      type: 'doughnut',
      data: chartData.region,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                size: 14
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        },
        cutout: '65%',
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    // Create chart
    const safetyChart = new Chart(ctx, chartConfig);

    // Tab switching functionality
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tab = btn.dataset.tab;
        safetyChart.data = chartData[tab];
        safetyChart.update();
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSafetyStats);

// Famous Roads Map
function initFamousRoads() {
  // Sample data for famous roads
  const roadsData = [
    {
      id: 1,
      name: "Route 66",
      country: "United States",
      length: "3,940 km",
      year: "1926",
      description: "The iconic 'Main Street of America' running from Chicago to Santa Monica, symbolizing American freedom and adventure.",
      coordinates: [35.173809, -99.320980],
      image: "https://source.unsplash.com/random/800x600/?route66",
      tags: ["Historic", "Scenic"],
      type: "highway"
    },
    {
      id: 2,
      name: "Pan-American Highway",
      country: "Multiple Countries",
      length: "30,000 km",
      year: "1936",
      description: "The world's longest motorable road network stretching from Alaska to Argentina, connecting diverse landscapes and cultures.",
      coordinates: [9.748917, -83.753426], // Costa Rica
      image: "https://source.unsplash.com/random/800x600/?panamerican,highway",
      tags: ["Longest", "International"],
      type: "highway"
    },
    {
      id: 3,
      name: "Great Ocean Road",
      country: "Australia",
      length: "243 km",
      year: "1932",
      description: "One of the world's most scenic coastal drives along Australia's southeastern coast, featuring the Twelve Apostles.",
      coordinates: [-38.680555, 143.392778],
      image: "https://source.unsplash.com/random/800x600/?great,ocean,road",
      tags: ["Coastal", "Scenic"],
      type: "coastal"
    },
    {
      id: 4,
      name: "Transfăgărășan Highway",
      country: "Romania",
      length: "90 km",
      year: "1974",
      description: "Dramatic mountain road crossing the Carpathians, famous for its sharp turns and stunning alpine views.",
      coordinates: [45.602222, 24.608333],
      image: "https://source.unsplash.com/random/800x600/?transfagarasan",
      tags: ["Mountain", "Winding"],
      type: "mountain"
    },
    {
      id: 5,
      name: "Trollstigen",
      country: "Norway",
      length: "106 km",
      year: "1936",
      description: "The 'Troll's Path' features 11 hairpin bends up a steep mountainside with breathtaking waterfalls and views.",
      coordinates: [62.455833, 7.671944],
      image: "https://source.unsplash.com/random/800x600/?trollstigen",
      tags: ["Mountain", "Hairpin"],
      type: "mountain"
    },
    {
      id: 6,
      name: "Stelvio Pass",
      country: "Italy",
      length: "24 km",
      year: "1825",
      description: "One of the highest and most spectacular mountain passes in the Alps with 48 hairpin turns.",
      coordinates: [46.528611, 10.453056],
      image: "https://source.unsplash.com/random/800x600/?stelvio,pass",
      tags: ["Alps", "Hairpin"],
      type: "mountain"
    }
  ];

  // DOM Elements
  const roadList = document.getElementById('roadList');
  const roadsMap = document.getElementById('roadsMap');
  const infoPanel = document.querySelector('.road-info-panel');
  const roadName = document.querySelector('.road-name');
  const roadDescription = document.querySelector('.road-description');
  const roadImage = document.querySelector('.road-image');
  const roadCountry = document.querySelector('.road-country span');
  const roadLength = document.querySelector('.road-length span');
  const roadYear = document.querySelector('.road-year span');
  const roadTags = document.querySelector('.road-tags');
  const exploreBtn = document.querySelector('.btn-explore');
  const photosBtn = document.querySelector('.btn-photos');
  const closePanelBtn = document.querySelector('.close-panel');
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  // Initialize Map
  const map = L.map(roadsMap, {
    zoomControl: false,
    attributionControl: false
  }).setView([20, 0], 2);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  // Custom icon
  const roadIcon = L.divIcon({
    className: 'road-marker',
    html: '<i class="fas fa-road"></i>',
    iconSize: [24, 24]
  });

  // Add markers to map and create list items
  roadsData.forEach(road => {
    // Create marker
    const marker = L.marker(road.coordinates, {
      icon: roadIcon
    }).addTo(map);
    
    // Bind popup
    marker.bindPopup(`<b>${road.name}</b><br>${road.country}`);
    
    // Create list item
    const listItem = document.createElement('div');
    listItem.className = 'road-list-item';
    listItem.dataset.id = road.id;
    listItem.innerHTML = `
      <div class="road-icon">
        <i class="fas fa-${road.type === 'highway' ? 'route' : road.type === 'coastal' ? 'water' : 'mountain'}"></i>
      </div>
      <div>
        <div class="road-name">${road.name}</div>
        <div class="road-location">${road.country}</div>
      </div>
    `;
    
    // Add click event to list item
    listItem.addEventListener('click', () => {
      showRoadInfo(road);
      map.flyTo(road.coordinates, 7);
      document.querySelectorAll('.road-list-item').forEach(item => {
        item.classList.remove('active');
      });
      listItem.classList.add('active');
    });
    
    // Add click event to marker
    marker.on('click', () => {
      showRoadInfo(road);
      document.querySelectorAll('.road-list-item').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelector(`.road-list-item[data-id="${road.id}"]`).classList.add('active');
    });
    
    roadList.appendChild(listItem);
  });

  // Show road info in panel
  function showRoadInfo(road) {
    roadName.textContent = road.name;
    roadDescription.textContent = road.description;
    roadImage.style.backgroundImage = `url(${road.image})`;
    roadCountry.textContent = road.country;
    roadLength.textContent = road.length;
    roadYear.textContent = road.year;
    
    // Set Google Maps link
    exploreBtn.href = `https://www.google.com/maps?q=${road.coordinates[0]},${road.coordinates[1]}`;
    
    // Clear and add tags
    roadTags.innerHTML = '';
    road.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'road-tag';
      tagElement.textContent = tag;
      roadTags.appendChild(tagElement);
    });
    
    // Show panel
    infoPanel.classList.add('active');
  }

  // Close info panel
  closePanelBtn.addEventListener('click', () => {
    infoPanel.classList.remove('active');
    document.querySelectorAll('.road-list-item').forEach(item => {
      item.classList.remove('active');
    });
  });

  // Search functionality
  searchBtn.addEventListener('click', searchRoads);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchRoads();
  });

  function searchRoads() {
    const searchTerm = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll('.road-list-item');
    
    listItems.forEach(item => {
      const name = item.querySelector('.road-name').textContent.toLowerCase();
      const country = item.querySelector('.road-location').textContent.toLowerCase();
      
      if (name.includes(searchTerm) || country.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Set first road as active by default if panel is closed
  if (!infoPanel.classList.contains('active')) {
    const firstRoad = roadsData[0];
    document.querySelector(`.road-list-item[data-id="${firstRoad.id}"]`).classList.add('active');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFamousRoads);










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