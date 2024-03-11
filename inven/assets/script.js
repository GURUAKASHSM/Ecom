const productContainer = document.querySelector('.container');
var urlParams = new URLSearchParams(window.location.search);
var token = urlParams.get('token');
// Function to fetch and display inventory items
async function fetchAndDisplayInventory() {
    try {
        const response = await fetch('http://localhost:8080/inventorydata'); // Replace with your backend API endpoint
        const inventoryItems = await response.json();

        // Loop through the inventory items and create product cards
        inventoryItems.forEach(item => {
            console.log(item)
            productContainer.innerHTML += `
            <div class="col-xs-12 col-md-6 bootstrap snippets bootdeys">
    
            <div class="product-content product-wrap clearfix">
            <div class="row">
            <div class="col-md-5 col-sm-12 col-xs-12">
            <div class="product-image">
            <img src="data:image/jpeg;base64,${item.image}" alt="194x228" class="img-responsive">
        
            </div>
            </div>
            <div class="col-md-7 col-sm-12 col-xs-12">
            <div class="product-deatil">
            <h5 class="name">
            <a href="#">
            ${item.itemname} <span>${item.itemcategory}</span>
            </a>
            </h5>
            <p class="price-container">
            <span>$${item.price.toFixed(2)}</span>
            </p>
            <span class="tag1"></span>
            </div>
            <div class="description">
            <p>Proin in ullamcorper lorem. Maecenas eu ipsum </p>
            </div>
            <div class="product-info smart-form">
            <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
            <a href="javascript:void(0);" class="btn btn-success">Add to cart</a>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="rating">
            <label for="stars-rating-5"><i class="fa fa-star"></i></label>
            <label for="stars-rating-4"><i class="fa fa-star"></i></label>
            <label for="stars-rating-3"><i class="fa fa-star text-primary"></i></label>
            <label for="stars-rating-2"><i class="fa fa-star text-primary"></i></label>
            <label for="stars-rating-1"><i class="fa fa-star text-primary"></i></label>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            `;

            productContainer.appendChild(productCard);

            // Add event listener to the "Add to Cart" button
            const addToCartButton = productCard.querySelector('.add-to-cart-button');
            addToCartButton.addEventListener('click', () => {
                // Create an object with the product name and price
                const cartItem = {
                    token: token,
                    name: item.itemname,
                    price: item.price,
                    quantity: item.sellerquantity
                };

                // Send the cart item to the backend
                addToCart(cartItem);
            });
        });
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
}

// Function to send the cart item to the backend
async function addToCart(cartItem) {
    try {
        const response = await fetch('http://localhost:8080/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });

        if (response.ok) {
            console.log('Item added to cart:', cartItem);
            // Optionally, you can display a success message or update the UI here
        } else {
            console.error('Failed to add item to cart:', response.statusText);
            // Handle the error or display an error message
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

// Fetch and display inventory items when the page loads
fetchAndDisplayInventory();