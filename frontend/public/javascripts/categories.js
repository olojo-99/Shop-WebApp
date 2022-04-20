
// function that returns a pag all products of a certain tag (e.g. phone, audio, etc.)
function category(tag){
    fetch("http://127.0.0.1:8000/api/products")
                .then(resp => resp.json())
                .then(data => {
                    data.forEach(element => {
                        // create a li element for each 
                        if (element['tag'] == tag){                   

                            let container = document.createElement("div");

                            let link = document.createElement("a");
                            link.innerHTML = element['name']; // <a>Iphone11</a>
                            let productStr = "/productindividual?id=" + element['id'];
                            link.href = productStr;
                            container.appendChild(link); // add link/name to child div
        
                                // Create list of product details - separate image link
                                const prodData = [element['description'], element['price']];
                                prodimage = element['product_image'] // need for src link
                
                                // display the product data in child div (excl. image)
                                prodData.forEach(detail => {
                                    let tmp = document.createElement("p");
                                    tmp.innerHTML = detail;
                                    container.appendChild(tmp);
                                });
                
                                // display image at end of child div
                                let imglink = document.createElement("a");
                                imglink.href = "/productindividual?id=" + element['id'];

                                let pic = document.createElement("img");
                                pic.src = prodimage; // edit img src

                                imglink.appendChild(pic);
                                container.appendChild(imglink); // add img with link to container
        
                                document.getElementById("prodlist").appendChild(container); // add the child div to the parent div
                    }
                        });
                    })
        }

// Get the name of the product category page we are on
let path = window.location.pathname;
let tag = path.split("/").pop(); //tag for product
category(tag);
