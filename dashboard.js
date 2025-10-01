// --- GLOBAL LOGOUT FUNCTION ---
// Function is defined outside the DOMContentLoaded event so it can be called 
// directly from the onclick attributes in dashboard.html.
function handleLogout() {
    // 1. Remove the authentication token
    localStorage.removeItem('authToken');
    // 2. Redirect to the homepage after logout
    window.location.href = 'index.html'; 
}

// --- MAIN DASHBOARD SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check (Page Guard)
    const token = localStorage.getItem('authToken');
    if (!token) {
        // If no token, redirect to login page
        alert('You must be logged in to view the dashboard.');
        window.location.href = 'login.html';
        return; // Stop further execution
    }

    // 2. Sidebar Toggle Functionality
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 3. Fetch and display user-specific data (Placeholder)
    fetchUserData(token);
});

// This is a placeholder for fetching real user data from your backend
async function fetchUserData(token) {
    
    const welcomeMessage = document.getElementById('welcomeMessage');
    if(welcomeMessage) {
        // Current behavior: displays "Welcome, Client!" for all users
        welcomeMessage.textContent = `Welcome, Client!`;
    }
    
    // Future expansion will go here to fetch the real user name.
}
