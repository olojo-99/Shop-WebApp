let addToCart = document.createElement("button"); // create a button
addToCart.innerHTML = "Add to cart"; // set the text of the button

//set vars
let params = window.location.search;
let urlParams = new URLSearchParams(params);
let productID = urlParams.get("id");

addToCart.onclick = ()=>{
   // code for when the button is clicked
	fetch('http://127.0.0.1:8000/apiadd/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+localStorage.getItem("access")
		},
		body: JSON.stringify({
			"product_id": parseInt(productID)
		})
	})
	.then(response=>response.json())
	.then(data=>{
			// display an add to cart success message
			console.log(data)
		});
}

document.body.appendChild(addToCart);
