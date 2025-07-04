// Animated Counters
function initSafetyHero() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Lower is faster
  let started = false;

  // Start counting when element is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        startCounters();
        started = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.safety-hero'));

  function startCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(startCounters, 1);
      } else {
        counter.innerText = formatNumber(target);
      }
    });
  }

  // Format large numbers with commas
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Update death per minute counter in real-time
  function updateRealTimeCounter() {
    const deathsPerMinute = 25;
    const deathsPerSecond = deathsPerMinute / 60;
    let totalDeaths = 0;
    const counterElement = document.querySelector('.counter[data-target="25"]');
    
    setInterval(() => {
      totalDeaths += deathsPerSecond;
      counterElement.textContent = Math.floor(totalDeaths);
      
      // Reset after reaching target (for demo purposes)
      if (totalDeaths >= deathsPerMinute) {
        totalDeaths = 0;
      }
    }, 1000);
  }

  // Start real-time counter after initial animation
  setTimeout(updateRealTimeCounter, 2500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSafetyHero);

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map
  initMap();
  
  // Set up event listeners
  setupEventListeners();
  
  // Simulate loading (in a real app, this would be an API call)
  setTimeout(() => {
    document.querySelector('.loading-overlay').style.display = 'none';
    updateMapData(); // Initial data load
  }, 1500);
});

function initMap() {
  // In a real implementation, this would initialize a map library like Leaflet or Google Maps
  const mapElement = document.getElementById('safety-map');
  
  // For demo purposes, we'll create a placeholder
  mapElement.innerHTML = '<div class="map-placeholder" style="width:100%;height:100%;background:#f0f0f0;display:flex;justify-content:center;align-items:center;color:#999;">Interactive Map Visualization</div>';
}

function setupEventListeners() {
  // Metric selector
  const metricSelect = document.getElementById('map-metric');
  metricSelect.addEventListener('change', updateMapData);
  
  // Year selector
  const yearSelect = document.getElementById('year-select');
  yearSelect.addEventListener('change', updateMapData);
  
  // Play button
  const playButton = document.getElementById('play-animation');
  playButton.addEventListener('click', toggleTimelineAnimation);
  
  // Legend info button
  const legendInfo = document.querySelector('.legend-info');
  legendInfo.addEventListener('click', showLegendInfo);
  
  // Simulate hover effects for demo
  simulateHoverEffects();
}

function updateMapData() {
  const metric = document.getElementById('map-metric').value;
  const year = document.getElementById('year-select').value;
  
  console.log(`Updating map with metric: ${metric}, year: ${year}`);
  
  // In a real implementation, this would update the map visualization
  // For demo, we'll just update the legend and title
  updateLegend(metric);
  updateTooltipSample();
}

function updateLegend(metric) {
  const legendHeader = document.querySelector('.legend-header h4');
  const legendNote = document.querySelector('.legend-note');
  
  switch(metric) {
    case 'deaths':
      legendHeader.textContent = 'Total Deaths Scale';
      legendNote.textContent = 'Total road fatalities';
      break;
    case 'rate':
      legendHeader.textContent = 'Fatality Rate Scale';
      legendNote.textContent = 'Deaths per 100,000 population';
      break;
    case 'pedestrians':
      legendHeader.textContent = 'Pedestrian Deaths Scale';
      legendNote.textContent = 'Pedestrian fatalities per 100,000';
      break;
    case 'motorcyclists':
      legendHeader.textContent = 'Motorcyclist Deaths Scale';
      legendNote.textContent = 'Motorcyclist fatalities per 100,000';
      break;
    case 'children':
      legendHeader.textContent = 'Child Deaths Scale';
      legendNote.textContent = 'Child fatalities (age 0-14) per 100,000';
      break;
  }
}

function toggleTimelineAnimation() {
  const playButton = document.getElementById('play-animation');
  const playIcon = playButton.querySelector('.play-icon i');
  const playText = playButton.querySelector('.play-text');
  
  if (playButton.classList.contains('playing')) {
    // Stop animation
    playButton.classList.remove('playing');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    playText.textContent = 'Play Timeline';
    console.log('Animation stopped');
  } else {
    // Start animation
    playButton.classList.add('playing');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    playText.textContent = 'Stop Animation';
    console.log('Animation started');
    
    // In a real implementation, this would animate through the years
  }
}

function showLegendInfo() {
  // In a real app, this would show a modal or tooltip with info
  alert('This legend shows the scale of values for the currently selected metric. Darker colors indicate higher values.');
}

function simulateHoverEffects() {
  const mapElement = document.getElementById('safety-map');
  const tooltip = document.querySelector('.map-tooltip');
  
  // Sample countries for demo
  const sampleCountries = [
    { name: 'United States', deaths: '42,939', rate: '12.9', pedestrians: '7,485', motorcyclists: '5,932', children: '1,203' },
    { name: 'Germany', deaths: '2,719', rate: '3.3', pedestrians: '457', motorcyclists: '623', children: '87' },
    { name: 'Brazil', deaths: '32,753', rate: '15.6', pedestrians: '9,432', motorcyclists: '11,287', children: '2,456' },
    { name: 'Japan', deaths: '3,215', rate: '2.5', pedestrians: '1,023', motorcyclists: '587', children: '65' }
  ];
  
  // For demo purposes, we'll simulate hover effects
  mapElement.addEventListener('mousemove', (e) => {
    // Only show tooltip in certain areas for demo
    const showTooltip = e.clientX % 5 === 0; // Random-ish display
    
    if (showTooltip) {
      const randomCountry = sampleCountries[Math.floor(Math.random() * sampleCountries.length)];
      const metric = document.getElementById('map-metric').value;
      
      // Update tooltip content
      document.querySelector('.country-name').textContent = randomCountry.name;
      document.querySelector('.country-value').textContent = randomCountry[metric === 'deaths' ? 'deaths' : 'rate'];
      document.querySelector('.metric-value.deaths').textContent = randomCountry.deaths;
      document.querySelector('.metric-value.pedestrians').textContent = randomCountry.pedestrians;
      document.querySelector('.metric-value.motorcyclists').textContent = randomCountry.motorcyclists;
      document.querySelector('.metric-value.children').textContent = randomCountry.children;
      
      // Position tooltip
      tooltip.style.left = `${e.clientX + 20}px`;
      tooltip.style.top = `${e.clientY + 20}px`;
      tooltip.style.opacity = '1';
    }
  });
  
  mapElement.addEventListener('mouseout', () => {
    tooltip.style.opacity = '0';
  });
}

function updateTooltipSample() {
  // This would update tooltip formatting based on selected metric
  const metric = document.getElementById('map-metric').value;
  const countryValue = document.querySelector('.country-value');
  
  if (metric === 'rate') {
    countryValue.textContent = countryValue.textContent.includes('.') ? countryValue.textContent : parseFloat(countryValue.textContent).toFixed(1);
  }
}

// Initialize the comparison section
function initComparisonSection() {
  // Set up tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and content
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // Update charts when tab changes
      updateCharts();
    });
  });
  
  // Set up metric selector
  const metricSelect = document.getElementById('comparison-metric');
  metricSelect.addEventListener('change', updateCharts);
  
  // Initialize charts
  initCharts();
  
  // Load initial data
  updateCharts();
}

// Initialize Chart.js instances
function initCharts() {
  // Chart configurations
  const chartConfigs = {
    worst: {
      type: 'bar',
      backgroundColor: '#e74c3c',
      comparisonColor: '#bdc3c7'
    },
    best: {
      type: 'bar',
      backgroundColor: '#2ecc71',
      comparisonColor: '#bdc3c7'
    },
    improving: {
      type: 'bar',
      backgroundColor: '#3498db',
      comparisonColor: null
    }
  };
  
  // Create chart instances
  window.comparisonCharts = {};
  Object.keys(chartConfigs).forEach(chartId => {
    const ctx = document.getElementById(`${chartId}-chart`).getContext('2d');
    const config = chartConfigs[chartId];
    
    window.comparisonCharts[chartId] = new Chart(ctx, {
      type: config.type,
      data: { labels: [], datasets: [] },
      options: getChartOptions(chartId)
    });
  });
}

// Get chart options based on chart type
function getChartOptions(chartId) {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw.toLocaleString();
            const metric = document.getElementById('comparison-metric').value;
            const suffix = metric === 'rate' ? ' per 100k' : '';
            return `${label}: ${value}${suffix}`;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            const metric = document.getElementById('comparison-metric').value;
            return metric === 'rate' ? value : value.toLocaleString();
          }
        }
      }
    }
  };
  
  if (chartId === 'improving') {
    commonOptions.scales.y.ticks.callback = function(value) {
      return `${value}%`;
    };
  }
  
  return commonOptions;
}

// Update charts with new data
function updateCharts() {
  const metric = document.getElementById('comparison-metric').value;
  const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
  
  // Sample data - in a real app, this would come from an API
  const sampleData = {
    worst: getSampleData('worst', metric),
    best: getSampleData('best', metric),
    improving: getSampleData('improving', metric)
  };
  
  // Update each chart
  Object.keys(window.comparisonCharts).forEach(chartId => {
    const chart = window.comparisonCharts[chartId];
    const data = sampleData[chartId];
    
    chart.data.labels = data.labels;
    chart.data.datasets = data.datasets;
    chart.update();
    
    // Update corresponding table
    updateDataTable(chartId, data);
  });
  
  // Update chart axes based on metric
  updateChartAxes(metric);
}

// Generate sample data for demonstration
function getSampleData(type, metric) {
  // Sample countries
  const countries = {
    worst: ['Libya', 'Thailand', 'Malawi', 'Liberia', 'Democratic Republic of Congo', 'Tanzania', 'Central African Republic', 'Iran', 'Rwanda', 'Mozambique'],
    best: ['Norway', 'Sweden', 'Switzerland', 'United Kingdom', 'Netherlands', 'Denmark', 'Finland', 'Japan', 'Singapore', 'Iceland'],
    improving: ['Estonia', 'Latvia', 'Lithuania', 'Portugal', 'Spain', 'Croatia', 'Slovenia', 'Poland', 'Hungary', 'Slovakia']
  };
  
  // Metric suffixes and multipliers
  const metricInfo = {
    total: { suffix: '', multiplier: 1 },
    rate: { suffix: ' per 100k', multiplier: 1 },
    pedestrian: { suffix: ' (pedestrians)', multiplier: 0.3 },
    motorcycle: { suffix: ' (motorcycles)', multiplier: 0.4 }
  };
  
  const { multiplier } = metricInfo[metric];
  const isImprovement = type === 'improving';
  
  // Generate random but realistic-looking data
  const baseValues = {
    worst: { min: 25, max: 35, comparisonOffset: 1 },
    best: { min: 2, max: 5, comparisonOffset: -0.5 },
    improving: { min: 15, max: 40, comparisonOffset: 0 }
  };
  
  const { min, max, comparisonOffset } = baseValues[type];
  
  const labels = countries[type];
  const currentValues = labels.map(() => 
    Math.floor((min + Math.random() * (max - min)) * multiplier)
  );
  
  const comparisonValues = isImprovement 
    ? null 
    : currentValues.map(val => 
        Math.max(0, val * (1 + (Math.random() * 0.2 - 0.1 + comparisonOffset)))
      );
  
  const improvementValues = isImprovement
    ? currentValues.map(val => Math.floor(val))
    : null;
  
  // Create datasets
  const datasets = [];
  
  if (isImprovement) {
    datasets.push({
      label: 'Improvement (%)',
      data: improvementValues,
      backgroundColor: '#3498db'
    });
  } else {
    datasets.push({
      label: 'Current',
      data: currentValues,
      backgroundColor: type === 'worst' ? '#e74c3c' : '#2ecc71'
    });
    
    datasets.push({
      label: 'Previous Year',
      data: comparisonValues,
      backgroundColor: '#bdc3c7'
    });
  }
  
  return {
    labels,
    datasets,
    currentValues,
    comparisonValues,
    improvementValues
  };
}

// Update data tables
function updateDataTable(chartId, data) {
  const tableBody = document.getElementById(`${chartId}-table`);
  const metric = document.getElementById('comparison-metric').value;
  const isImprovement = chartId === 'improving';
  
  let rows = '';
  
  data.labels.forEach((country, index) => {
    const currentValue = data.currentValues[index];
    const comparisonValue = data.comparisonValues ? data.comparisonValues[index] : null;
    const improvementValue = data.improvementValues ? data.improvementValues[index] : null;
    
    let changeCell = '';
    let valueCell = '';
    
    if (isImprovement) {
      valueCell = `${improvementValue}%`;
      rows += `
        <tr>
          <td>${index + 1}</td>
          <td>${country}</td>
          <td>${valueCell}</td>
          <td>${Math.round(currentValue * 0.7)}${metric === 'rate' ? '' : 'k'}</td>
          <td>${Math.round(currentValue * 0.3)}${metric === 'rate' ? '' : 'k'}</td>
        </tr>
      `;
    } else {
      const change = currentValue - comparisonValue;
      const changePercent = Math.round((change / comparisonValue) * 100);
      
      const changeClass = change >= 0 ? 'negative' : 'positive';
      const changeSymbol = change >= 0 ? '+' : '';
      
      valueCell = metric === 'rate' 
        ? currentValue.toFixed(1) 
        : Math.round(currentValue).toLocaleString();
      
      changeCell = `
        <span class="${changeClass}">
          ${changeSymbol}${Math.abs(changePercent)}%
        </span>
      `;
      
      rows += `
        <tr>
          <td>${index + 1}</td>
          <td>${country}</td>
          <td>${valueCell}${metric === 'rate' ? ' per 100k' : ''}</td>
          <td>${changeCell}</td>
        </tr>
      `;
    }
  });
  
  tableBody.innerHTML = rows;
}

// Update chart axes based on selected metric
function updateChartAxes(metric) {
  Object.keys(window.comparisonCharts).forEach(chartId => {
    const chart = window.comparisonCharts[chartId];
    
    if (chartId === 'improving') {
      chart.options.scales.y.ticks.callback = function(value) {
        return `${value}%`;
      };
    } else {
      chart.options.scales.y.ticks.callback = function(value) {
        return metric === 'rate' ? value : value.toLocaleString();
      };
    }
    
    chart.update();
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initComparisonSection);

// Initialize Dangerous Roads Section
function initDangerousRoads() {
  // Sample data for dangerous roads
  const dangerousRoads = [
    {
      id: 1,
      title: "North Yungas Road",
      location: "Bolivia",
      type: "Mountain Road",
      image: "1.jpg",
      fatalities: "200-300",
      length: "69 km",
      dangerRating: 5,
      hazards: [
        "Narrow lanes", "Steep cliffs", "No guardrails", 
        "Frequent landslides", "Poor visibility"
      ],
      description: "Known as 'Death Road', this treacherous route features single-lane width, 600-meter drops, and frequent fog and rain. It's estimated that 200-300 travelers die here annually.",
      tips: [
        "Travel during daylight hours only",
        "Use experienced local drivers",
        "Avoid the route during rainy season",
        "Check weather conditions before traveling",
        "Ensure vehicle is in excellent condition"
      ]
    },
    {
      id: 2,
      title: "Sichuan-Tibet Highway",
      location: "China",
      type: "High Mountain Highway",
      image: "2.jpg",
      fatalities: "150+",
      length: "2,142 km",
      dangerRating: 4,
      hazards: [
        "Altitude sickness", "Rockfalls", 
        "Unpredictable weather", "Poor road conditions"
      ],
      description: "This high-altitude highway climbs to over 5,000 meters, with sharp turns, unstable terrain, and sudden weather changes that make it extremely hazardous.",
      tips: [
        "Acclimate to altitude before traveling",
        "Carry oxygen supplies",
        "Check avalanche warnings",
        "Travel in convoy when possible",
        "Avoid winter months"
      ]
    },
    {
      id: 3,
      title: "James Dalton Highway",
      location: "Alaska, USA",
      type: "Remote Arctic Road",
      image: "3.jpg",
      fatalities: "50+",
      length: "666 km",
      dangerRating: 4,
      hazards: [
        "Extreme cold", "Isolation", 
        "Gravel surface", "Wild animals"
      ],
      description: "This isolated road through the Arctic wilderness has no services, extreme weather, and long distances between help. Breakdowns can be deadly in winter.",
      tips: [
        "Carry emergency supplies for several days",
        "Have satellite communication",
        "Winterize your vehicle properly",
        "Travel with extra fuel",
        "Inform others of your travel plans"
      ]
    },
    {
      id: 4,
      title: "Taroko Gorge Road",
      location: "Taiwan",
      type: "Mountain Cliff Road",
      image: "4.jpg",
      fatalities: "100+",
      length: "19 km",
      dangerRating: 4,
      hazards: [
        "Narrow tunnels", "Falling rocks", 
        "Sharp curves", "Heavy tourist traffic"
      ],
      description: "This scenic but deadly road cuts through marble cliffs with frequent rockfalls and blind curves. The narrow tunnels are particularly dangerous for larger vehicles.",
      tips: [
        "Avoid driving after heavy rains",
        "Watch for falling rocks",
        "Use horn before entering tunnels",
        "Drive slowly and cautiously",
        "Avoid large vehicles if possible"
      ]
    },
    {
      id: 5,
      title: "Trollstigen",
      location: "Norway",
      type: "Mountain Pass",
      image: "2.jpg",
      fatalities: "30+",
      length: "8 km",
      dangerRating: 3,
      hazards: [
        "Steep inclines", "Sharp hairpin turns", 
        "Narrow width", "Tourist congestion"
      ],
      description: "The 'Troll's Path' features 11% gradients, sharp hairpin turns, and sections barely wide enough for two cars. The steep drops make any mistake potentially fatal.",
      tips: [
        "Use low gear on descents",
        "Pull over at viewing areas to let others pass",
        "Avoid peak tourist seasons",
        "Check for road closures before traveling",
        "Don't stop on the road itself"
      ]
    },
        {
      id: 5,
      title: "Trollstigen",
      location: "Norway",
      type: "Mountain Pass",
      image: "2.jpg",
      fatalities: "30+",
      length: "8 km",
      dangerRating: 3,
      hazards: [
        "Steep inclines", "Sharp hairpin turns", 
        "Narrow width", "Tourist congestion"
      ],
      description: "The 'Troll's Path' features 11% gradients, sharp hairpin turns, and sections barely wide enough for two cars. The steep drops make any mistake potentially fatal.",
      tips: [
        "Use low gear on descents",
        "Pull over at viewing areas to let others pass",
        "Avoid peak tourist seasons",
        "Check for road closures before traveling",
        "Don't stop on the road itself"
      ]
    },
        {
      id: 5,
      title: "Trollstigen",
      location: "Norway",
      type: "Mountain Pass",
      image: "2.jpg",
      fatalities: "30+",
      length: "8 km",
      dangerRating: 3,
      hazards: [
        "Steep inclines", "Sharp hairpin turns", 
        "Narrow width", "Tourist congestion"
      ],
      description: "The 'Troll's Path' features 11% gradients, sharp hairpin turns, and sections barely wide enough for two cars. The steep drops make any mistake potentially fatal.",
      tips: [
        "Use low gear on descents",
        "Pull over at viewing areas to let others pass",
        "Avoid peak tourist seasons",
        "Check for road closures before traveling",
        "Don't stop on the road itself"
      ]
    },
        {
      id: 5,
      title: "Trollstigen",
      location: "Norway",
      type: "Mountain Pass",
      image: "2.jpg",
      fatalities: "30+",
      length: "8 km",
      dangerRating: 3,
      hazards: [
        "Steep inclines", "Sharp hairpin turns", 
        "Narrow width", "Tourist congestion"
      ],
      description: "The 'Troll's Path' features 11% gradients, sharp hairpin turns, and sections barely wide enough for two cars. The steep drops make any mistake potentially fatal.",
      tips: [
        "Use low gear on descents",
        "Pull over at viewing areas to let others pass",
        "Avoid peak tourist seasons",
        "Check for road closures before traveling",
        "Don't stop on the road itself"
      ]
    },
        {
      id: 3,
      title: "James Dalton Highway",
      location: "Alaska, USA",
      type: "Remote Arctic Road",
      image: "3.jpg",
      fatalities: "50+",
      length: "666 km",
      dangerRating: 4,
      hazards: [
        "Extreme cold", "Isolation", 
        "Gravel surface", "Wild animals"
      ],
      description: "This isolated road through the Arctic wilderness has no services, extreme weather, and long distances between help. Breakdowns can be deadly in winter.",
      tips: [
        "Carry emergency supplies for several days",
        "Have satellite communication",
        "Winterize your vehicle properly",
        "Travel with extra fuel",
        "Inform others of your travel plans"
      ]
    },
  ];

  // DOM elements
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselDots = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const modal = document.querySelector('.road-details-modal');
  const closeModal = document.querySelector('.close-modal');

  // State variables
  let currentIndex = 0;
  const cardWidth = 280; // Should match CSS card width + gap
  const visibleCards = Math.min(3, dangerousRoads.length);

  // Initialize carousel
  function initCarousel() {
    // Create road cards
    carouselTrack.innerHTML = dangerousRoads.map(road => `
      <div class="road-card" data-id="${road.id}">
        <img src="${road.image}" alt="${road.title}" class="road-card-image">
        <div class="road-card-content">
          <h3 class="road-card-title">${road.title}</h3>
          <div class="road-card-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${road.location}</span>
          </div>
          <div class="road-card-stats">
            <div class="road-card-stat">
              <span class="road-card-stat-value">${road.fatalities}</span>
              <span class="road-card-stat-label">Fatalities</span>
            </div>
            <div class="road-card-stat">
              <span class="road-card-stat-value">${road.length}</span>
              <span class="road-card-stat-label">Length</span>
            </div>
            <div class="road-card-stat">
              <span class="road-card-stat-value">${'★'.repeat(road.dangerRating)}${'☆'.repeat(5 - road.dangerRating)}</span>
              <span class="road-card-stat-label">Danger</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Create dots
    carouselDots.innerHTML = dangerousRoads.map((_, index) => `
      <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
    `).join('');

    // Set initial position
    updateCarousel();
  }

  // Update carousel position
  function updateCarousel() {
    const offset = -currentIndex * (cardWidth + 24); // 24px gap
    carouselTrack.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= dangerousRoads.length - visibleCards;
  }

  // Show modal with road details
  function showRoadDetails(roadId) {
    const road = dangerousRoads.find(r => r.id === roadId);
    if (!road) return;
    
    // Populate modal
    document.querySelector('.road-title').textContent = road.title;
    document.querySelector('.road-location').textContent = road.location;
    document.querySelector('.road-type').textContent = road.type;
    document.querySelector('.stat-value.fatalities').textContent = road.fatalities;
    document.querySelector('.stat-value.length').textContent = road.length;
    document.querySelector('.stat-value.danger-rating').textContent = road.dangerRating;
    
    // Create stars for rating
    const starsContainer = document.querySelector('.rating-stars');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('i');
      star.className = i < road.dangerRating ? 'fas fa-star' : 'far fa-star';
      starsContainer.appendChild(star);
    }
    
    // Set hazards
    const hazardsList = document.querySelector('.hazards-list');
    hazardsList.innerHTML = road.hazards.map(hazard => `
      <span class="hazard-tag">
        <i class="fas fa-exclamation-triangle"></i>
        ${hazard}
      </span>
    `).join('');
    
    // Set description and tips
    document.querySelector('.road-description').textContent = road.description;
    
    const tipsList = document.querySelector('.tips-list');
    tipsList.innerHTML = road.tips.map(tip => `<li>${tip}</li>`).join('');
    
    // Set map image (in a real app, this would be an interactive map)
    document.querySelector('.road-map-image').src = road.image;
    document.querySelector('.road-map-image').alt = `Map of ${road.title}`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < dangerousRoads.length - visibleCards) {
      currentIndex++;
      updateCarousel();
    }
  });

  document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.target.dataset.index);
      updateCarousel();
    });
  });

  // Delegate card click events
  carouselTrack.addEventListener('click', (e) => {
    const card = e.target.closest('.road-card');
    if (card) {
      const roadId = parseInt(card.dataset.id);
      showRoadDetails(roadId);
    }
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.querySelector('.modal-overlay').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Initialize
  initCarousel();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDangerousRoads);
