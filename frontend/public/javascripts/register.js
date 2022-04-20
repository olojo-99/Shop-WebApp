
// Func to check if provided email address is valid
function validateEmail(emailAddr) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddr))
  {
    return true
  }
    return false
    // https://www.w3resource.com/javascript/form/email-validation.php
}

function formValidator(event)
    {
        event.preventDefault(); // prevent browser from carrying out default behaviour
        let username = document.getElementById("username").value; // get the value the in the username box
        let password = document.getElementById("password").value; // get the value in the password box
        let email = document.getElementById("email").value; // get the value in the password box
        if( username == ""){
            alert("Username cannot be null");
        }

        else if (password == ""){
            alert("Password cannot be null");
        }

        else if (!validateEmail(email)){
            alert("Invalid Email");
        }

        else{
            fetch("http://127.0.0.1:8000/api/token/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
            }).then(response=>response.json())
            .then(data=>{
                console.log(data); // still log it so we can debug

            if('access' in data){
                // Means we found another user with the same credentials -> Invalid
                alert("username already exists");
            }

            else{
                // register the user
                fetch("http://127.0.0.1:8000/apiregister/", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password, email: email})
                }).then(response=>response.json())
                .then(data=>console.log(data)); // log the response from endpoint

                window.location.href = "/login"; // redirect to login page
            }
        });

        }
    }

let myform = document.getElementById("register-form"); // get the form 
myform.addEventListener('submit', formValidator); // bind the validator function to the submit button for the form

