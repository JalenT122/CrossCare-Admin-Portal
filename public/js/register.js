document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    if (!registerForm) {
        console.error('Register form not found!');
        return;
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing up...';

        const formData = {
            companyName: document.getElementById('companyName').value,
            role: document.getElementById('role').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };

        console.log('Form data being sent:', formData);

        try {
            const response = await fetch('/register', {
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
                successMessage.textContent = 'Successfully signed up! Redirecting...';
                successMessage.classList.remove('hidden');

                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                errorMessage.textContent = data.error || 'Registration failed';
                errorMessage.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign Up';
            }
        } catch (error) {
            console.error('Caught error:', error);
            errorMessage.textContent = 'An error has occurred. Please try again.';
            errorMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';
        }
    });
});