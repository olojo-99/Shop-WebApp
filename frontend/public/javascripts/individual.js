// Display the details of product
window.onload = ()=>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let productID = urlParams.get("id");
    // http://127.0.0.1:8000/api/products/id 
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
                // Create list of product details - separate image link
                const prodData = [data['name'], data['description'], data['price']];
                prodimage = data['product_image'] // need for src link

                // display the product data in HTML list (excl. image)
                prodData.forEach(detail => {
                    let tmp = document.createElement("li");
                    tmp.innerHTML = detail;
                    document.getElementById("prod-details").appendChild(tmp);
                }
                );

                // display image at end of HTML list
                let tmpImg = document.createElement("li");
                let pic = document.createElement("img");
                pic.src = prodimage; // edit img src

                tmpImg.appendChild(pic); //add img tag to li tag
                document.getElementById("prod-details").appendChild(tmpImg);
            }
        });
    }
}
