const errorMessage = document.getElementById('errorMessage');

async function loadDashboard() {
    try {
        const userEmail = sessionStorage.getItem('userEmail');

        if (userEmail) {
            document.getElementById('welcomeMessage').textContent = `Welcome ${userEmail}`;
        } else {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        errorMessage.textContent = 'Error loading dashboard';
    }
}

document.getElementById('signoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/signout', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            sessionStorage.removeItem('userEmail');
            window.location.href = '/signout';
        } else {
            errorMessage.textContent = 'Error signing out';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error signing out';
    }
});

loadDashboard();