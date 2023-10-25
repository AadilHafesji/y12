document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('signInEmailAddress');
    const passwordInput = document.getElementById('signInPassword');
    const submitButton = document.getElementById('submitButton');
    const togglePasswordIcon = document.getElementById('togglePassword');
  
    // Function to check if email and password fields are filled and enable/disable the submit button
    function checkFormValidity() {
        const isValid = emailInput.value.trim() !== '' && passwordInput.value.trim() !== '';
        submitButton.disabled = !isValid;
    }
  
    // Function to handle password visibility toggle
    function togglePasswordVisibility() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordIcon.classList.toggle('fa-eye-slash');
    }
  
    // Event listeners for input fields
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
  
    // Event listener for password visibility toggle
    togglePasswordIcon.addEventListener('click', togglePasswordVisibility);
  
    // Prevent form submission for demonstration purposes
    document.getElementById("signInForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const email = document.getElementById("signInEmailAddress").value;
        const password = document.getElementById("signInPassword").value;
    
        // Prepare data to be sent to the server
        const data = {
            email: email,
            password: password
        };
    
        // Send data to the server using fetch API
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.isValid) {
                // Login successful
                console.log('Login successful');
                console.log(data);
                // Redirect to another page or show a success message
                alert("Login Successful!");
                window.location.reload();
            } else {
                // Login failed
                console.error('Login failed');
                // Show an error message to the user
                alert("Login Failed!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
    });
});