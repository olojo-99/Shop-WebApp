function createOrder(event)
    {
        event.preventDefault(); // prevent browser from carrying out default behaviour
        let addr = document.getElementById("address").value; // get the value the of shipping address
        if( addr == ""){
            alert("Shipping address cannot be null");
        }

        else{
            fetch("http://127.0.0.1:8000/api/basket/", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem("access")
            },
            }).then(response=>response.json())
            .then(data=>{
                let basket = data[0];
                let id = basket['id'];

                fetch('http://127.0.0.1:8000/apicheckout/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+localStorage.getItem("access")
                    },
                    body: JSON.stringify({basket_id: id, shipping_addr: addr})
                });
                window.location.href = "/previous"; // redirect to previous orders page after ordering
            });
        }
    }

let myform = document.getElementById("order-form"); // get the form 
myform.addEventListener('submit', createOrder); // bind the validator function to the submit button for the form
