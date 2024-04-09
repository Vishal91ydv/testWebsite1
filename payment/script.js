document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.payment-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Perform form validation
        const emailInput = document.getElementById('email');
        const cardNumberInput = document.getElementById('card-number');
        const expiryDateInput = document.getElementById('expiry-date');
        const cvvInput = document.getElementById('cvv');
        const paymentAmountInput = document.getElementById('payment-amount');

        let isValid = true;

        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Please enter a valid email address.');
        } else {
            removeError(emailInput);
        }

        if (!cardNumberInput.value.trim()) {
            isValid = false;
            showError(cardNumberInput, 'Please enter customer name.');
        } else {
            removeError(cardNumberInput);
        }

        // Add more validation rules as needed...

        if (isValid) {
            // Form is valid, store form data locally
            const formData = {
                email: emailInput.value,
                cardNumber: cardNumberInput.value,
                expiryDate: expiryDateInput.value,
                cvv: cvvInput.value,
                paymentAmount: paymentAmountInput.value
            };

            // Convert formData object to JSON and store it in localStorage
            localStorage.setItem('formData', JSON.stringify(formData));

            // Generate and download a JSON file containing the form data
            downloadFormData(formData);

            // Show success message
            showMessage('Form data stored successfully!');
        }
    });

    // Helper function to validate email
    function isValidEmail(email) {
        // Very basic email validation
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            const error = document.createElement('div');
            error.classList.add('error-message');
            error.innerText = message;
            formGroup.appendChild(error);
        } else {
            errorMessage.innerText = message;
        }
        formGroup.classList.add('error');
    }

    // Helper function to remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
            formGroup.classList.remove('error');
        }
    }

    // Helper function to show message
    function showMessage(message) {
        // Create a message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('success-message');
        messageElement.innerText = message;

        // Append message element to the form
        form.appendChild(messageElement);

        // Remove the message after 3 seconds
        setTimeout(function() {
            messageElement.remove();
        }, 3000);
    }

    // Helper function to download form data as a JSON file
    function downloadFormData(formData) {
        // Convert formData object to JSON string
        const json = JSON.stringify(formData, null, 2);

        // Create a Blob containing the JSON data
        const blob = new Blob([json], { type: 'application/json' });

        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'payment_data.json';

        // Append the link to the document body and trigger a click event
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
});
