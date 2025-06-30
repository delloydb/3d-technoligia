








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