// --- MAIN SETUP ---
// This single event listener is the entry point for all our JavaScript
document.addEventListener('DOMContentLoaded', main);

// Define the base URL for all API calls
const API_BASE_URL = 'https://bizmovepro-backend.onrender.com';


function main() {
  // Initialize all components of the website
  setupTheme();
  setupFAQ();
  setupScrollToTop();
  setupChatbox();
  setupForms();
  setupCalculator();
  setupServiceCardButtons();
  setupFormValidation();
  setupAuth();
  setupDemoModals();
  setupScrollspy();
}

// --- CORE FUNCTIONALITY ---

function setupTheme() {
  const themeToggleBtn = document.querySelector('.theme-toggle');
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️';
  }
  if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        themeToggleBtn.innerHTML = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
  }
}

function setupFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      question.classList.toggle('active');
      question.nextElementSibling.classList.toggle('show');
    });
  });
}

function setupScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (!scrollBtn) return;
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollBtn.classList.add('clicked');
    setTimeout(() => scrollBtn.classList.remove('clicked'), 400);
  });
}

function setupChatbox() {
  const chatIcon = document.querySelector('.chat-icon');
  const chatBox = document.querySelector('.chat-box');
  const closeBtn = document.querySelector('.chat-box .btn-close');
  const sendBtn = document.querySelector('.chat-footer button');
  const chatInput = document.getElementById('chatInput');

  if (!chatIcon || !chatBox || !closeBtn || !sendBtn || !chatInput) return;

  const toggleChat = () => chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
  const sendMessage = () => {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;
    const messages = document.getElementById('chatMessages');
    messages.innerHTML += `<div class="message sent"><p>${userMessage}</p></div>`;
    setTimeout(() => {
      messages.innerHTML += `<div class="message received"><p>Thanks! We'll reply shortly.</p></div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 500);
    chatInput.value = '';
  };

  chatIcon.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

// --- FORM HANDLING ---

function setupForms() {
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this).entries());
      // FIXED: Using Render URL for Quote
      fetch(`${API_BASE_URL}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(() => {
        alert(`Thank you, ${data.name}! Your request has been submitted.`);
        this.reset();
      })
      .catch(err => console.error('Error submitting quote:', err));
    });
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this).entries());
      // FIXED: Using Render URL for Booking
      fetch(`${API_BASE_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(() => {
        alert(`Thank you, ${data.name}! Your booking has been received.`);
        this.reset();
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        if (bookingModal) bookingModal.hide();
      })
      .catch(err => console.error('Error submitting booking:', err));
    });
  }
}

function setupFormValidation() {
    const quoteFormEmail = document.querySelector('#quoteForm input[name="email"]');
    if (quoteFormEmail) {
        quoteFormEmail.addEventListener('input', function() {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            this.classList.toggle('is-valid', isValid);
            this.classList.toggle('is-invalid', !isValid);
        });
    }
}

// --- AUTHENTICATION ---

function setupAuth() {
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  const logoutButton = document.querySelector('#user-section button');

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (signUpForm) signUpForm.addEventListener('submit', handleSignUp);
  if (logoutButton) logoutButton.addEventListener('click', handleLogout);

  checkLoginStatus();
}

function checkLoginStatus() {
  const token = localStorage.getItem('authToken');
  const authButtons = document.getElementById('auth-buttons');
  const userSection = document.getElementById('user-section');
  if (!authButtons || !userSection) return;

  authButtons.style.display = token ? 'none' : 'flex';
  userSection.style.display = token ? 'flex' : 'none';
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    // FIXED: Using Render URL for Modal Login
    const res = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const { token } = await res.json();
    localStorage.setItem('authToken', token);
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    checkLoginStatus();
  } catch (err) {
    alert('Login failed. Please check credentials.');
    console.error(err);
  }
}

async function handleSignUp(e) {
  e.preventDefault();
  const name = document.getElementById('signUpName').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  try {
    // FIXED: Using Render URL for Modal Sign Up
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error('Sign up failed');
    alert('Registration successful! Please log in.');
    bootstrap.Modal.getInstance(document.getElementById('signUpModal')).hide();
    document.getElementById('signUpForm').reset();
  } catch (err) {
    alert('Sign up failed. User may already exist.');
    console.error(err);
  }
}

function handleLogout() {
  localStorage.removeItem('authToken');
  checkLoginStatus();
}

// --- OTHER PAGE-SPECIFIC SETUP ---

function setupCalculator() {
  const calculatorForm = document.getElementById('movingCalculator');
  if (!calculatorForm) return;

  const calculateCost = () => {
    const size = document.getElementById('officeSize').value;
    const distance = document.getElementById('distance').value;
    const packing = document.getElementById('packing').checked;
    const storage = document.getElementById('storage').checked;
    let cost = size * 0.5 + distance * 20 + (packing ? 200 : 0) + (storage ? 150 : 0);
    document.getElementById('estimatedCost').textContent = '$' + cost.toLocaleString();
    document.getElementById('sizeValue').textContent = size + ' sq ft';
  };

  calculatorForm.addEventListener('input', calculateCost);
  calculateCost();
}

function setupServiceCardButtons() {
    const bookButtons = document.querySelectorAll('.book-service-btn');
    const bookingModalServiceSelect = document.querySelector('#bookingModal #service');
    if (!bookButtons.length || !bookingModalServiceSelect) return;

    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.service-card, .modal-content');
            const serviceTitle = card.querySelector('.card-title, .modal-title').textContent.trim().replace(' Details', '');
            bookingModalServiceSelect.value = serviceTitle;
        });
    });
}

function setupDemoModals() {
    // AI Planner Demo
    const generatePlanBtn = document.querySelector('#aiPlannerModal button');
    if(generatePlanBtn) generatePlanBtn.addEventListener('click', generatePlan);

    // Tracking Demo
    const trackingModal = document.getElementById('trackingModal');
    if(trackingModal) trackingModal.addEventListener('show.bs.modal', startTrackingDemo);
}

function generatePlan() {
  const officeSize = document.getElementById('demoOfficeSize').value;
  const employeeCount = document.getElementById('demoEmployeeCount').value;
  const modalBody = document.getElementById('aiPlannerBody');
  modalBody.innerHTML = `<div class="text-center"><p>Analyzing...</p><div class="loader"></div></div>`;
  setTimeout(() => {
    modalBody.innerHTML = `<h5>Your Generated Move Plan</h5><p class="text-muted">Based on a ${officeSize} sq ft office.</p><ul class="list-group"><li class="list-group-item"><strong>Phase 1:</strong> Pre-Move Packing</li><li class="list-group-item"><strong>Phase 2:</strong> Overnight Transit</li><li class="list-group-item"><strong>Phase 3:</strong> Unpacking & Setup</li></ul><div class="alert alert-success mt-3"><strong>Recommended:</strong> 2 Trucks, 8 Movers</div>`;
  }, 2500);
}

function startTrackingDemo() {
  const progressBar = document.getElementById('trackingProgressBar');
  const shipmentStatus = document.getElementById('shipmentStatus');
  const statuses = ['packed', 'transit', 'delivered'];
  
  const resetTrackingDemo = () => {
    shipmentStatus.textContent = 'Processing';
    progressBar.style.width = '10%';
    statuses.forEach(status => {
        document.getElementById(`status-${status}`).className = 'list-group-item d-flex justify-content-between align-items-center text-muted';
        document.getElementById(`badge-${status}`).innerHTML = `<i class="fas fa-clock"></i>`;
    });
  };

  const updateStatus = (elementId, badgeId, badgeClass, iconClass) => {
    document.getElementById(elementId).classList.remove('text-muted');
    const badge = document.getElementById(badgeId);
    badge.className = `badge ${badgeClass} rounded-pill`;
    badge.innerHTML = `<i class="${iconClass}"></i>`;
  };
  
  resetTrackingDemo();
  setTimeout(() => { shipmentStatus.textContent = 'Packed'; progressBar.style.width = '33%'; updateStatus('status-packed', 'badge-packed', 'bg-success', 'fas fa-check'); }, 1500);
  setTimeout(() => { shipmentStatus.textContent = 'In Transit'; progressBar.style.width = '66%'; updateStatus('status-transit', 'badge-transit', 'bg-success', 'fas fa-truck'); }, 3000);
  setTimeout(() => { shipmentStatus.textContent = 'Delivered'; progressBar.style.width = '100%'; updateStatus('status-delivered', 'badge-delivered', 'bg-success', 'fas fa-home'); }, 4500);
}


function setupScrollspy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-nav a.nav-link");

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "";

        // Find which section is currently in view
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // A larger offset can help prevent flickering
            const sectionTop = current.offsetTop - 150; 
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute("id");
            }
        });

        // Update the active class on the corresponding nav link
        navLinks.forEach(link => {
            link.classList.remove("active");
            // Check if the link's href contains the ID of the current section
            if (link.getAttribute("href").includes(currentSectionId)) {
                link.classList.add("active");
            }
        });
    }

    // Add an event listener that listens for scroll events
    window.addEventListener("scroll", navHighlighter);
}
