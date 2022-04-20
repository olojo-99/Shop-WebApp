
// create function that get products from the api/products endpoint
function displayCard(product_info){
    let product_name = product_info['name'];
    let quantity = product_info['quantity'];
    let price = product_info['price'];
    let productid = product_info['product_id'];

    token = localStorage.getItem("access");

    fetch('http://127.0.0.1:8000/api/products/'+productid)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
            // Create list of product details - separate image link
            const prodData = [data['name'], data['description'], data['price'], quantity]; // quantity is not part of products endpoint -> basket endpoint
            prodimage = data['product_image'] // need for src link

            let container = document.createElement("div"); // parent div

            // display the product data in HTML list (excl. image)
            prodData.forEach(detail => {
                let tmp = document.createElement("p");
                tmp.innerHTML = detail;
                container.appendChild(tmp);
            }
            );

            // display image at end of HTML list
            let pic = document.createElement("img");
            pic.src = prodimage; // edit img src

            document.getElementById("cart").appendChild(pic);

            let removeFromCart = document.createElement("button");
            removeFromCart.innerHTML = "Remove item from basket";
            removeFromCart.onclick = function(){

                fetch("http://127.0.0.1:8000/apiremove/", {
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token // pass access key in header
                    },
                    body: JSON.stringify({"product_id":productid})
                })
                
                window.location.reload(); // reload the page once the item has been removed

            }
            container.appendChild(removeFromCart);

            document.getElementById("cart").appendChild(container);
    });
}

function buildCartPage(){
    token = localStorage.getItem("access");
    if(token == null){
        window.location = "/login"; // redirect the user to the login page
    }

    fetch("http://127.0.0.1:8000/api/basket", {
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token // pass access key in header
        }
    })
        
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            let basket = data[0];
            let id = basket['id'];
            let items = basket['items'];

            if(items.length == 0)
            {
                document.getElementById("empty").innerHTML = "Your basket is empty";
            }

            else{
                items.forEach(ele => displayCard(ele));

                let checkout = document.createElement("button"); // create a button
                checkout.innerHTML = "Checkout"; // set the text of the button

                checkout.onclick = ()=> window.location.href = "/order"; // redirect to home

                document.body.appendChild(checkout);
            }
        });
            
}

buildCartPage();
