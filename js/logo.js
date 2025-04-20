// js/logo.js
export function handleLogoClick() {
    logoClickCount++;

    // Clear any existing timeout
    if (logoClickTimeout) {
        clearTimeout(logoClickTimeout);
    }

    // Set a timeout to reset the click count after 5 seconds
    logoClickTimeout = setTimeout(() => {
        logoClickCount = 0;
    }, 5000);

    // Check if we've reached 5 clicks
    if (logoClickCount === 5) {
        // Create a modal dialog for password input
        const modal = document.createElement('div');
        modal.className = 'password-modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'password-modal-content';

        const title = document.createElement('h3');
        title.textContent = 'Enter Password';

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter password';
        passwordInput.className = 'password-input';

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.className = 'password-submit-btn';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'password-cancel-btn';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'password-button-container';
        buttonContainer.appendChild(submitBtn);
        buttonContainer.appendChild(cancelBtn);

        modalContent.appendChild(title);
        modalContent.appendChild(passwordInput);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        // Focus on the password input
        passwordInput.focus();

        // Handle submit button click
        submitBtn.addEventListener('click', function () {
            if (passwordInput.value === '123') {
                document.querySelector('.edit-controls').classList.add('visible');
                alert('Edit controls have been enabled!');
                document.body.removeChild(modal);
            } else {
                alert('Incorrect password. Please try again.');
                passwordInput.value = '';
                logoClickCount = 0;
            }
        });

        // Handle cancel button click
        cancelBtn.addEventListener('click', function () {
            document.body.removeChild(modal);
            logoClickCount = 0;
        });

        // Handle Enter key press
        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        // Handle Escape key press
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                    logoClickCount = 0;
                }
            }
        });
    }
}