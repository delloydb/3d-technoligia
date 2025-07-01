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

