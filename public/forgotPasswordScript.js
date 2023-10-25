document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('forgotPasswordEmail');
    const submitButton = document.querySelector('.forgotPassword-form button');
  
    // Function to check if a valid email address is provided and enable/disable the submit button
    function checkFormValidity() {
        const isValidEmail = isValidEmailAddress(emailInput.value.trim());
        submitButton.disabled = !isValidEmail;
    }
  
    // Function to validate email address format
    function isValidEmailAddress(email) {
        // Basic email format validation (you can enhance this validation as needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  
    // Event listener for input field to check for a valid email address
    emailInput.addEventListener('input', checkFormValidity);
  
    // Prevent form submission for demonstration purposes
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform your forgot password logic here
        // For demonstration, you can show an alert indicating a password reset email sent
        alert('Password reset email sent! Please check your inbox.');
        // Redirect to a success page or show a success message
        // window.location.href = 'password-reset-success.html';
    });
});