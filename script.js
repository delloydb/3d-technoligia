// Typewriter Effect for Hero Title
const heroTitle = document.querySelector('.hero-title');
const titleLines = document.querySelectorAll('.title-line');

function typeWriter(line, index) {
  const text = line.textContent;
  line.textContent = '';
  line.style.display = 'inline-block';
  
  let i = 0;
  const speed = 50 + (index * 30);
  
  function type() {
    if (i < text.length) {
      line.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  setTimeout(type, index * 500);
}

titleLines.forEach((line, index) => {
  typeWriter(line, index);
});

// 3D Globe with Three.js
function initGlobe() {
  const container = document.getElementById('globe');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Create globe
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
  const bumpMap = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: bumpMap,
    bumpScale: 0.05,
    specular: new THREE.Color('grey'),
    shininess: 5
  });
  
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Add clouds
  const cloudGeometry = new THREE.SphereGeometry(2.05, 32, 32);
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'),
    transparent: true,
    opacity: 0.3
  });
  
  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(clouds);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    clouds.rotation.y += 0.0015;
    renderer.render(scene, camera);
  }
  
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initGlobe();
  
  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const globe = document.getElementById('globe');
    
    if (hero && heroContent && globe) {
      hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
      heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      globe.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
});

// Smooth scroll for the indicator
document.querySelector('.scroll-indicator').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});

// Animated Counter JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const factCards = document.querySelectorAll('.fact-card');
  
  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Animate numbers when scrolled to
  function animateNumbers() {
    factCards.forEach(card => {
      if (card.getAttribute('data-animated') !== 'true' && isInViewport(card)) {
        const numberElement = card.querySelector('.counter');
        const suffix = card.getAttribute('data-suffix') || '';
        const target = parseFloat(card.getAttribute('data-number'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        card.setAttribute('data-animated', 'true');
        
        function updateNumber(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentValue = start + (target - start) * progress;
          
          if (suffix === '%') {
            numberElement.textContent = Math.floor(currentValue);
          } else {
            numberElement.textContent = currentValue.toFixed(target % 1 === 0 ? 0 : 1);
          }
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        }
        
        requestAnimationFrame(updateNumber);
      }
    });
  }
  
  // Initialize animation on load and scroll
  animateNumbers();
  window.addEventListener('scroll', animateNumbers);
  
  // Add staggered animation to cards
  factCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate__animated', 'animate__fadeInUp');
  });
});

// Timeline Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineProgress = document.getElementById('timeline-progress');
  const scrollbarThumb = document.getElementById('scrollbar-thumb');
  const scrollbarTrack = document.getElementById('scrollbar-track');
  const prevBtn = document.getElementById('timeline-prev');
  const nextBtn = document.getElementById('timeline-next');
  
  let currentIndex = 0;
  const totalItems = timelineItems.length;
  
  // Initialize timeline
  function initTimeline() {
    // Set scrollbar thumb width
    scrollbarThumb.style.width = `${100 / totalItems}%`;
    
    // Show first item
    timelineItems[0].classList.add('visible');
    
    // Animate progress bar on scroll
    window.addEventListener('scroll', updateTimelineProgress);
    
    // Navigation controls
    prevBtn.addEventListener('click', showPrevItem);
    nextBtn.addEventListener('click', showNextItem);
    
    // Scrollbar click navigation
    scrollbarTrack.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newIndex = Math.min(totalItems - 1, Math.floor(pos * totalItems));
      showItem(newIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') showPrevItem();
      if (e.key === 'ArrowRight') showNextItem();
    });
  }
  
  // Update timeline progress indicator
  function updateTimelineProgress() {
    const timelineRect = document.querySelector('.timeline').getBoundingClientRect();
    const scrollPosition = window.scrollY - timelineRect.top + window.innerHeight / 2;
    const progress = Math.min(1, Math.max(0, scrollPosition / timelineRect.height));
    
    timelineProgress.style.height = `${progress * 100}%`;
    
    // Show items when they come into view
    timelineItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < window.innerHeight * 0.75) {
        item.classList.add('visible');
      }
    });
  }
  
  // Show specific timeline item
  function showItem(index) {
    if (index < 0 || index >= totalItems) return;
    
    currentIndex = index;
    timelineItems.forEach(item => item.classList.remove('active'));
    timelineItems[index].classList.add('active');
    
    // Scroll to item
    timelineItems[index].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Update scrollbar position
    scrollbarThumb.style.left = `${(index / totalItems) * 100}%`;
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalItems - 1;
  }
  
  // Show previous item
  function showPrevItem() {
    showItem(currentIndex - 1);
  }
  
  // Show next item
  function showNextItem() {
    showItem(currentIndex + 1);
  }
  
  // Initialize the timeline
  initTimeline();
});

// Quiz Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Quiz questions data
  const quizData = [
    {
      question: "What percentage of global road fatalities occur in low-income countries?",
      options: ["25%", "50%", "73%", "90%"],
      correct: 2,
      fact: "Despite having only 1% of the world's vehicles, low-income countries account for 13% of deaths."
    },
    {
      question: "Which age group has the highest risk of road traffic injuries?",
      options: ["5-14 years", "15-29 years", "30-45 years", "65+ years"],
      correct: 1,
      fact: "Road traffic injuries are the leading cause of death for children and young adults aged 5-29 years."
    },
    {
      question: "What's the economic cost of road crashes in most countries?",
      options: ["1% of GDP", "2% of GDP", "3% of GDP", "5% of GDP"],
      correct: 2,
      fact: "Road traffic crashes cost most countries 3% of their gross domestic product."
    },
    {
      question: "How many lives could be saved each year with proper seat belt use?",
      options: ["50,000", "150,000", "250,000", "350,000"],
      correct: 1,
      fact: "Seat belts reduce the risk of death by 45-50% for front seat occupants."
    },
    {
      question: "What percentage of pedestrian deaths occur in urban areas?",
      options: ["40%", "60%", "75%", "90%"],
      correct: 2,
      fact: "Pedestrians account for 23% of all road traffic deaths globally."
    }
  ];

  // DOM Elements
  const quizContainer = document.querySelector('.quiz-container');
  const quizToggle = document.getElementById('quiz-toggle');
  const quizSlide = document.getElementById('quiz-slide');
  const resultsSlide = document.getElementById('results-slide');
  const questionText = document.getElementById('question-text');
  const quizOptions = document.getElementById('quiz-options');
  const progressBar = document.getElementById('quiz-progress');
  const currentQuestionEl = document.getElementById('current-question');
  const totalQuestionsEl = document.getElementById('total-questions');
  const scoreValue = document.getElementById('score-value');
  const resultsTitle = document.getElementById('results-title');
  const correctAnswersEl = document.getElementById('correct-answers');
  const incorrectAnswersEl = document.getElementById('incorrect-answers');
  const timeSpentEl = document.getElementById('time-spent');
  const resultsFeedback = document.getElementById('results-feedback');
  const retakeBtn = document.getElementById('retake-quiz');
  const startBtn = document.querySelector('.btn-start-quiz');

  // Quiz state
  let currentQuestion = 0;
  let score = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let startTime;
  let userAnswers = [];
  let quizActive = false;

  // Initialize quiz
  function initQuiz() {
    totalQuestionsEl.textContent = quizData.length;
    startBtn.addEventListener('click', startQuiz);
    retakeBtn.addEventListener('click', startQuiz);
  }

  // Start the quiz
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    userAnswers = [];
    startTime = new Date();
    quizActive = true;
    
    quizToggle.style.display = 'none';
    quizContainer.classList.add('active');
    showQuestion();
    
    // Start timer
    if (window.quizTimer) clearInterval(window.quizTimer);
    window.quizTimer = setInterval(updateTimer, 1000);
  }

  // Display current question
  function showQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionEl.textContent = currentQuestion + 1;
    
    // Update progress bar
    progressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
    
    // Clear previous options
    quizOptions.innerHTML = '';
    
    // Create new options
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.textContent = option;
      button.addEventListener('click', () => selectAnswer(index));
      quizOptions.appendChild(button);
    });
  }

  // Handle answer selection
  function selectAnswer(selectedIndex) {
    if (!quizActive) return;
    
    const question = quizData[currentQuestion];
    const options = quizOptions.querySelectorAll('.quiz-option');
    let isCorrect = selectedIndex === question.correct;
    
    // Mark selected option
    options[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Mark correct answer if wrong
    if (!isCorrect) {
      options[question.correct].classList.add('correct');
    }
    
    // Store user answer
    userAnswers.push({
      question: question.question,
      selected: question.options[selectedIndex],
      correct: question.options[question.correct],
      isCorrect: isCorrect,
      fact: question.fact
    });
    
    // Update score
    if (isCorrect) {
      score += 20;
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }
    
    // Disable all buttons
    options.forEach(option => {
      option.disabled = true;
    });
    
    // Move to next question or show results
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  // Show quiz results
  function showResults() {
    quizActive = false;
    clearInterval(window.quizTimer);
    
    // Calculate time spent
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000;
    timeSpentEl.textContent = Math.floor(timeDiff);
    
    // Update results
    scoreValue.textContent = score;
    correctAnswersEl.textContent = correctAnswers;
    incorrectAnswersEl.textContent = incorrectAnswers;
    
    // Set results title based on score
    if (score >= 80) {
      resultsTitle.textContent = "Excellent!";
      resultsTitle.style.color = "#2ecc71";
    } else if (score >= 60) {
      resultsTitle.textContent = "Good Job!";
      resultsTitle.style.color = "#3498db";
    } else {
      resultsTitle.textContent = "Keep Learning!";
      resultsTitle.style.color = "#e74c3c";
    }
    
    // Generate feedback
    resultsFeedback.innerHTML = '';
    userAnswers.forEach((answer, index) => {
      const feedbackItem = document.createElement('div');
      feedbackItem.className = 'feedback-item';
      
      const questionEl = document.createElement('div');
      questionEl.className = 'feedback-question';
      questionEl.textContent = `${index + 1}. ${answer.question}`;
      
      const answerEl = document.createElement('div');
      answerEl.className = `feedback-answer ${answer.isCorrect ? 'correct' : 'incorrect'}`;
      answerEl.innerHTML = `You answered: <strong>${answer.selected}</strong><br>
                           ${answer.isCorrect ? 'Correct!' : `Correct answer: ${answer.correct}`}<br>
                           <em>${answer.fact}</em>`;
      
      feedbackItem.appendChild(questionEl);
      feedbackItem.appendChild(answerEl);
      resultsFeedback.appendChild(feedbackItem);
    });
    
    // Show results slide
    quizSlide.classList.remove('active');
    resultsSlide.style.display = 'block';
    progressBar.style.width = '100%';
    
    // Animate results
    setTimeout(() => {
      resultsSlide.style.opacity = '1';
    }, 100);
  }

  // Update timer display
  function updateTimer() {
    if (!quizActive) return;
    const currentTime = new Date();
    const timeDiff = (currentTime - startTime) / 1000;
    timeSpentEl.textContent = Math.floor(timeDiff);
  }

  // Initialize the quiz
  initQuiz();
});

// Interactive Safety Tips JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.btn-filter');
  const tipCards = document.querySelectorAll('.safety-tip-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter cards
      tipCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Modal functionality
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.tip-modal');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.tip-modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close when clicking outside modal content
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }
  });
  
  // Animate cards on scroll
  function animateOnScroll() {
    tipCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight * 0.75) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize animation state
  tipCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
  });
  
  // Trigger initial animation check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Newsletter Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  const submitBtn = document.querySelector('.btn-submit');
  const formMessage = document.querySelector('.form-message');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get email value
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Simple validation
      if (!email || !email.includes('@')) {
        formMessage.textContent = 'Please enter a valid email address';
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
        return;
      }
      
      // Simulate form submission
      submitBtn.disabled = true;
      formMessage.textContent = '';
      formMessage.classList.remove('error');
      
      // Show loading state
      submitBtn.innerHTML = '<span>Sending...</span>';
      
      // Simulate API call
      setTimeout(() => {
        // Show success state
        newsletterForm.classList.add('form-submitted');
        formMessage.textContent = 'Thank you for subscribing!';
        formMessage.classList.add('success');
        
        // Reset form after animation
        setTimeout(() => {
          emailInput.value = '';
        }, 1000);
        
        // Re-enable button
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Subscribe Now</span><svg class="icon-send" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/></svg><svg class="icon-check" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>';
          newsletterForm.classList.remove('form-submitted');
        }, 3000);
      }, 1500);
    });
  }
  
  // Floating elements animation on scroll
  const floatingElements = document.querySelectorAll('.floating-car, .floating-sign, .floating-envelope');
  
  function animateOnScroll() {
    floatingElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.75);
      
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize animation state
  floatingElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
  });
  
  // Check on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
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