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
<div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="bookingModalLabel">Book Your Move</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="bookingForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" required>
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label">Your Email</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" required>
            </div>
            <div class="col-md-6">
              <label for="phone" class="form-label">Phone Number</label>
              <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter your phone number" required>
            </div>
            <div class="col-md-6">
              <label for="service" class="form-label">Select Service</label>
              <select class="form-select" id="service" name="service" required>
                <option value="">Choose a service</option>
                <option value="Office Relocation">Office Relocation</option>
                <option value="Packing Services">Packing Services</option>
                <option value="IT Equipment Moving">IT Equipment Moving</option>
                <option value="Storage Solutions">Storage Solutions</option>
              </select>
            </div>
            <div class="col-12">
              <label for="message" class="form-label">Additional Details</label>
              <textarea class="form-control" id="message" name="message" rows="4" placeholder="Provide any additional details"></textarea>
            </div>
          </div>
          <div class="modal-footer mt-4">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit Booking</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
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
