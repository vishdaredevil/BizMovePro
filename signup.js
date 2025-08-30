document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpPageForm');

    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert('Sign up successful! Please proceed to the login page.');
                // Redirect to the login page
                window.location.href = 'login.html';
            } else {
                // Handle errors like a user already existing
                const errorData = await response.json();
                alert(`Sign up failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Sign up error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});