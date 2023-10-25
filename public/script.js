$('#navbar').load('index.html #navbar');
$('#footer').load('index.html #footer');

// Contact Section
var user = [
  name = "",
  email = "",
  description = ""
]
  
function verify() {
  var button = document.getElementById("submitButton");
  
  user.name = document.querySelector("#name").value;
  user.email = document.querySelector("#emailAddress").value;
  user.description = document.querySelector("#description").value;
  
  if (user.name === "") {
    button.disabled = true;
  } else if (user.email === "") {
    button.disabled = true;
  } else if (user.description === "") {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
  
  document.getElementById('submitButton').onclick = function() {
    console.log(user.name);
    console.log(user.email);
    console.log(user.description);
      
    if (user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      alert("Valid email address!");

      confirm('Email has been Sent'); 
            
      window.location.reload();
            
      return true;
    } else {
      alert("Invalid email address!");
      return false;
    }
  }
}
