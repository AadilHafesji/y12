document.addEventListener('DOMContentLoaded', function() {
    const firstNameInput = document.getElementById('firstName');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('signUpEmailAddress');
    const passwordInput = document.getElementById('signUpPassword');
    const submitButton = document.getElementById('submitButton');
    const togglePasswordIcon = document.getElementById('togglePassword');
  
    // Function to check if all fields are filled and enable/disable the submit button
    function checkFormValidity() {
        const isValid = firstNameInput.value.trim() !== '' &&
                        surnameInput.value.trim() !== '' &&
                        emailInput.value.trim() !== '' &&
                        passwordInput.value.trim() !== '';
        submitButton.disabled = !isValid;
    }
  
    // Function to handle password visibility toggle
    function togglePasswordVisibility() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordIcon.classList.toggle('fa-eye-slash');
    }
  
    // Event listeners for input fields
    firstNameInput.addEventListener('input', checkFormValidity);
    surnameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
  
    // Event listener for password visibility toggle
    togglePasswordIcon.addEventListener('click', togglePasswordVisibility);

    document.getElementById("signUpForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const firstName = document.getElementById("firstName").value;
        const surname = document.getElementById("surname").value;
        const email = document.getElementById("signUpEmailAddress").value;
        const password = document.getElementById("signUpPassword").value;
    
        // Prepare data to be sent to the server
        const data = {
            firstName: firstName,
            surname: surname,
            email: email,
            password: password
        };
    
        // Send data to the server using fetch API
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                surname: surname,
                email: email,
                password: password
            })
        }).then((response) => {
            console.log("YO");
            console.log(response);
        })
        .then((json) => console.log(json))
        .catch((err) => {
            console.log(err);
        });
    });
});
