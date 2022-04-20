function formValidator(event)
    {
        event.preventDefault(); // prevent browser from carrying out default behaviour
        let username = document.getElementById("username").value; // get the value the in the username box
        let password = document.getElementById("password").value; // get the value in the password box
        if( username == ""){
            alert("Username cannot be null");
        }

        else if (password == ""){
            alert("Password cannot be null");
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
                // successful login
                let accessToken = data['access'];
                let refreshToken = data['refresh'];
                localStorage.setItem("access", accessToken);
                localStorage.setItem("refresh", refreshToken);

                window.location.href = "/"; // the "/" is the homepage for node http://127.0.0.1:3000
            }

        else{
            alert("username or password invalid");
        }
        });
        
        }
    }

let myform = document.getElementById("login-form"); // get the form 
myform.addEventListener('submit', formValidator); // bind the validator function to the submit button for the form