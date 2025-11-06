document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing up...';

        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };

        console.log('Form data being sent:', formData);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log("Response status:", response.status);

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                successMessage.textContent = 'Successfully logged in! Redirecting...';
                successMessage.classList.remove('hidden');
                
                sessionStorage.setItem('userEmail', formData.email);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                errorMessage.textContent = data.error || 'Login failed';
                errorMessage.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Log In';
            }
        } catch (error) {
            console.error('Caught error:', error);
            errorMessage.textContent = 'An error has occurred. Please try again.';
            errorMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
        }
    });
});