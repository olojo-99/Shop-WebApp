// Display the details of product
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let productID = urlParams.get("id");
    let token = localStorage.getItem("access");

    // http://127.0.0.1:8000/api/products/[id]
    if(productID != null && typeof(productID)!= 'undefined'){
        fetch('http://127.0.0.1:8000/api/products/'+productID)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if('detail' in data){
                // Error message
                let element = document.createElement("p");
                element.innerHTML = "Page Not Found"; // add text to created p tag

                document.body.appendChild(element);
            }
            else{
                let container = document.createElement("div"); //create child div

                // Create list of product details - separate image link
                const prodData = [data['name'], data['description'], data['price']];
                prodimage = data['product_image'] // need for src link

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

                container.appendChild(pic);

                let addToCart = document.createElement("button"); // create a button
                addToCart.innerHTML = "Add to cart"; // set the text of the button
                
                container.appendChild(addToCart);
                
                addToCart.onclick = ()=>{
                    // code for when the button is clicked
                     fetch('http://127.0.0.1:8000/apiadd/', {
                         method: 'POST',
                         headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         body: JSON.stringify({
                             "product_id": productID
                         })
                     })
                     .then(response=>response.json())
                     .then(data=>{
                             // display an add to cart success message
                             console.log("We got the following response from adding to cart:", data)
                         });
                }
                document.getElementById("prod-details").appendChild(container); // add child div to parent
            }
        });
    }
