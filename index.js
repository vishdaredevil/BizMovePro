<script>
    // Theme Toggle
    function toggleTheme() {
      const body = document.body;
      const isDarkMode = body.classList.toggle("dark-mode");
      
      // Update button icon
      const themeBtn = document.querySelector('.theme-toggle');
      themeBtn.innerHTML = isDarkMode ? '☀️' : '🌙';
      
      // Save preference to localStorage
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
    
   
    
    // FAQ functionality
    function setupFAQ() {
      document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const icon = question.querySelector('i');
          
          // Close all other FAQs
          document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
              item.style.display = 'none';
              const otherIcon = item.previousElementSibling.querySelector('i');
              otherIcon.classList.remove('fa-chevron-up');
              otherIcon.classList.add('fa-chevron-down');
            }
          });
          
          // Toggle current FAQ
          if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          } else {
            answer.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          }
        });
      });
    }
    
    // Scroll to Top functionality
    function setupScrollToTop() {
      window.addEventListener('scroll', () => {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });
      
      document.querySelector('.scroll-to-top').addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      // Set theme from localStorage
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector('.theme-toggle').innerHTML = '☀️';
      }
      
      // Initialize components
      setupFAQ();
      setupScrollToTop();
      
      // Initialize chatbox
      document.querySelector('.chat-icon').addEventListener('click', toggleChat);
      document.querySelector('.chat-box .btn-close').addEventListener('click', toggleChat);
    });
    
    // Form submissions
    document.getElementById('bookingForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const service = document.getElementById('service').value;
      alert(`Thank you, ${name}! Your booking for "${service}" has been received.`);
      this.reset();
      bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
    });
    
    document.getElementById('quoteForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get('name');
      const service = formData.get('service');
      alert(`Thank you, ${name}! Your request for "${service}" has been submitted.`);
      this.reset();
    });
    
    // Calculator functionality
    function calculateCost() {
      const size = document.getElementById('officeSize').value;
      const distance = document.getElementById('distance').value;
      const packing = document.getElementById('packing').checked;
      const storage = document.getElementById('storage').checked;
      
      let cost = size * 0.5 + distance * 20;
      if (packing) cost += 200;
      if (storage) cost += 150;
      
      document.getElementById('estimatedCost').textContent = '$' + cost.toLocaleString();
    }
    
    // Update size value display
    document.getElementById('officeSize').addEventListener('input', function() {
      document.getElementById('sizeValue').textContent = this.value + ' sq ft';
    });
  </script>
