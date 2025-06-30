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