document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginPageForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Correct API URL with the login endpoint path
        const API_URL = 'https://bizmovepro-backend.onrender.com/api/users/login'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('authToken', token);
                // Redirect to the dashboard after successful login
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please check your network or try again.');
        }
    });
});
