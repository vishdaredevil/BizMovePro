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
 <script>
function showFeatureDemo(feature) {
  // Implement feature demo modal or animation
  switch(feature) {
    case 'ai-planner':
      alert("Opening interactive AI Moving Planner demo");
      // window.open('demo-ai-planner.html', '_blank');
      break;
    case 'tracking':
      alert("Showing Real-Time Tracking demo");
      // window.open('demo-tracking.html', '_blank');
      break;
    case 'downtime':
      alert("Playing Zero-Downtime Moving explainer video");
      // window.open('video-downtime.html', '_blank');
      break;
  }
}
</script>
<script>
function calculateCost() {
  const size = document.getElementById('officeSize').value;
  const distance = document.getElementById('distance').value;
  const packing = document.getElementById('packing').checked;
  const storage = document.getElementById('storage').checked;
  
  let cost = size * 0.5 + distance * 20;
  if (packing) cost += 200;
  if (storage) cost += 150;
  
  document.getElementById('estimatedCost').textContent = '$' + cost.toLocaleString();
}// Enhance calculator with Indian cities
const indianCities = {
  "Delhi": { baseRate: 50000 },
  "Mumbai": { baseRate: 60000 },
  "Bangalore": { baseRate: 55000 },
  "Hyderabad": { baseRate: 45000 }
};

function calculateIndianMove() {
  const fromCity = document.getElementById('fromCity').value;
  const toCity = document.getElementById('toCity').value;
  // Calculate based on distance between selected cities
}
</script>
<script>
function showServiceDetails(serviceName) {
  // You can implement a modal or page redirect here
  console.log("Showing details for: " + serviceName);
  // For now, just show an alert
  alert(`You clicked on ${serviceName}. This would open detailed service information.`);
}
</script>
<script>
   // Scroll to Top functionality
   window.addEventListener('scroll', () => {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });
   
    
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  // Chatbox functionality
   function toggleChat() {
      const chatBox = document.querySelector('.chat-box');
      chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
    }
    
    function sendMessage() {
      const input = document.getElementById('chatInput');
      const userMessage = input.value.trim();
      
      if (userMessage === '') return;
      
      const messages = document.getElementById('chatMessages');
      
      // Add user message
      messages.innerHTML += `
        <div class="message sent">
          <p>${userMessage}</p>
        </div>
      `;
      
      // Bot response (simple example)
      setTimeout(() => {
        messages.innerHTML += `
          <div class="message received">
            <p>Thanks for your message! Our team will respond shortly.</p>
          </div>
        `;
        messages.scrollTop = messages.scrollHeight;
      }, 500);
      
      input.value = '';
    }
    
    // Initialize chatbox on page load
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelector('.chat-icon').addEventListener('click', toggleChat);
      document.querySelector('.chat-box .btn-close').addEventListener('click', toggleChat);
    });
    
  </script>
<script>
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  // Display a confirmation message (you can replace this with an API call)
  alert(`Thank you, ${name}! Your booking for "${service}" has been received. We will contact you shortly.`);

  // Reset the form
  document.getElementById('bookingForm').reset();

  // Close the modal
  const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
  bookingModal.hide();
});
document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const service = formData.get('service');

  // Display a confirmation message
  alert(`Thank you, ${name}! Your request for "${service}" has been submitted. We will contact you shortly.`);

  // Reset the form
  this.reset();
});
</script>
<script>
  // Chatbox functionality - Complete working solution
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbox state
    const chatBox = document.querySelector('.chat-box');
    chatBox.style.display = 'none';
    
    // Toggle chatbox visibility
    function toggleChat() {
      if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
      } else {
        chatBox.style.display = 'none';
      }
    }
    
    // Send message function
    function sendMessage() {
      const input = document.getElementById('chatInput');
      const userMessage = input.value.trim();
      
      if (userMessage === '') return;
      
      const messages = document.getElementById('chatMessages');
      
      // Add user message
      messages.innerHTML += `
        <div class="message sent">
          <p>${userMessage}</p>
        </div>
      `;
      
      // Bot response
      setTimeout(() => {
        messages.innerHTML += `
          <div class="message received">
            <p>Thanks for your message! Our team will respond shortly.</p>
          </div>
        `;
        messages.scrollTop = messages.scrollHeight;
      }, 500);
      
      input.value = '';
    }
    
    // Event listeners
    document.querySelector('.chat-icon').addEventListener('click', toggleChat);
    document.querySelector('.chat-box .btn-close').addEventListener('click', toggleChat);
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    document.querySelector('.chat-footer button').addEventListener('click', sendMessage);
  });
  </script>
