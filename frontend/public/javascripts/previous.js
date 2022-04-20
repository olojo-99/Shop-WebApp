
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

            // display the product data in HTML list (excl. image)
            prodData.forEach(detail => {
                let tmp = document.createElement("li");
                tmp.innerHTML = detail;
                document.getElementById("orders").appendChild(tmp);
            }
            );

            // display image at end of HTML list
            let tmpImg = document.createElement("li");
            let pic = document.createElement("img");
            pic.src = prodimage; // edit img src

            tmpImg.appendChild(pic); //add img tag to li tag
            document.getElementById("orders").appendChild(tmpImg);
    });
}

function buildCartPage(){
    token = localStorage.getItem("access");
    if(token == null){
        window.location = "/login"; // redirect the user to the login page
    }

    fetch("http://127.0.0.1:8000/api/orders/", {
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token // pass access key in header
        }
    })
        
        .then(response=>response.json())
        .then(data=>{

            if(data.length == 0){
                // Results in a page simple containing no orders message
                document.getElementById("no-orders").innerHTML = "";
                document.getElementById("message").innerHTML = "You have no previous orders";
            }

            else{
                table = document.getElementById("previous"); //table

                for (i = 0; i < data.length; i++){
                    console.log(data[i]) // view order details in console

                    let order = data[i];

                    let element = document.createElement("tr");

                    element.insertCell("td").innerHTML = order["total_price"]; // add order price
                    element.insertCell("td").innerHTML = order["shipping_addr"]; // add shipping address
                    element.insertCell("td").innerHTML = order["date_ordered"]; // add order date
                    element.insertCell("td").innerHTML = order["id"]; // add order ID

                    table.appendChild(element); // add to table define on HTML page
                }


            }
        });
            
}

buildCartPage();
