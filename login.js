document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginPageForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://bizmovepro-backend.onrender.com', {
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
            alert('An error occurred. Please try again.');
        }
    });

});
