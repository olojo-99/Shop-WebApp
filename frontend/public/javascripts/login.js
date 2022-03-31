window.userLoggedIn = false;

	function isLoggedIn(){
		let accessToken = localStorage.getItem("access");

    // accessToken will become an empty string after logging out
    if(accessToken != ""){
      // if there is an access token in localstorage
      window.userLoggedIn = true;
    }

    // In the case that the user is logged in
		if(window.userLoggedIn){
          // get the ID of the login link in Nav Bar
          let loginLink = document.getElementById("auth-link");
          loginLink.innerHTML = "Logout"; // change from 'Login' to 'Logout'
          loginLink.href = "#"; // no link for logout

          loginLink.onclick = () =>{
            // simply remove the access and refresh token
            localStorage.setItem("access", "");
            localStorage.setItem("refresh", "");
            window.location.href = "/"; //refresh the page after logging out
          }
			}
	}

window.onload = function(){
	isLoggedIn(); // when the page loads call isLoggedIn
}
