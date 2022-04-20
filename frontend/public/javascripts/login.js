window.userLoggedIn = false;

	function isLoggedIn(){
		let accessToken = localStorage.getItem("access");

    // accessToken will become null after logging out
    if(accessToken != null){
      // if there is an access token in localstorage
      window.userLoggedIn = true;
    }

    // In the case that the user is logged in
		if(window.userLoggedIn){
          // get the ID of the login link in Nav Bar
          let loginLink = document.getElementById("auth-link");
          loginLink.innerHTML = "Logout"; // change from 'Login' to 'Logout'
          loginLink.href = "#"; // no link for logout

          // Add a link to the shopping basket if user is logged in
          let basketLink = document.getElementById("basket-link");
          basketLink.innerHTML = "Shopping Basket"; // Display some HTML in the navbar for the shopping basket
          basketLink.href = "/basket"; // add a link to the basket page

          // Add a link to order history if user is logged in
          let orderLink = document.getElementById("order-link");
          orderLink.innerHTML = "Order History"; // Display some HTML in the navbar for the order history link
          orderLink.href = "/previous"; // add a link to the order history
          loginLink.onclick = () =>{
            // simply remove the access and refresh token
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/"; // redirect to home
          }
			}
	}

window.onload = function(){
	isLoggedIn(); // when the page loads call isLoggedIn
}
