
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

    // 3. Fetch and display user-specific data (Future Step)
    fetchUserData(token);
});

// This is a placeholder for fetching real user data from your backend
async function fetchUserData(token) {
    // In the future, you will create a backend endpoint like '/api/users/me'
    // For now, we will just use a placeholder name.
    
    const welcomeMessage = document.getElementById('welcomeMessage');
    if(welcomeMessage) {
        // When your backend is ready, you'll replace 'Client' with the user's actual name
        welcomeMessage.textContent = `Welcome, Client!`;
    }
    function handleLogout() {
    localStorage.removeItem('authToken');
    // Redirect to the homepage after logout
    window.location.href = 'index.html'; 
}

// --- MAIN DASHBOARD SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check (Page Guard)
    const token = localStorage.getItem('authToken');
    // ... (rest of the code)
});
    
    /*
    // EXAMPLE of how you would fetch real data in the future:
    try {
        const response = await fetch('http://localhost:5000/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            // If token is invalid, log the user out
            handleLogout();
            return;
        }
        const userData = await response.json();
        // Update the UI with the user's name
        welcomeMessage.textContent = `Welcome, ${userData.name}!`;

    } catch (error) {
        console.error('Failed to fetch user data:', error);
        handleLogout(); // Logout on error
    }
    */

}
