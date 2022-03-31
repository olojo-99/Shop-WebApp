fetch("http://127.0.0.1:8000/api/products")
            .then(resp => resp.json())
            .then(data => {
                data.forEach(element => {
                    // create a li element for each 
                    console.log(element);
                    let tmpLi = document.createElement("li");
                    let link = document.createElement("a");
                    link.innerHTML = element['name']; // <a>Iphone11</a>
                    // /products?id=x
                    let productStr = "/productindividual?id=" + element['id'];
                    tmpLi.appendChild(link);
                    console.log(productStr);
                    link.href = productStr;
                    document.getElementById("prodlist").appendChild(tmpLi)
                });
            })
            