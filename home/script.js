function HideHomePage() {
    document.querySelector('.blog').style.display = 'none'
    document.querySelector('.testimonial').style.display = 'none'
    document.querySelector('.product-container').style.display = 'none'
    document.querySelector('.category').style.display = 'none'
    document.querySelector('.banner').style.display = 'none'
    document.querySelector('.desktop-navigation-menu').style.display = 'none'
    document.querySelector('.cta-container').style.display = 'none'
    document.querySelector('.service').style.display = 'none'

}
HideHomePage()


function HomePage() {
    document.querySelector('.blog').style.display = 'block'
    document.querySelector('.testimonial').style.display = 'block'
    document.querySelector('.product-container').style.display = 'block'
    document.querySelector('.category').style.display = 'block'
    document.querySelector('.banner').style.display = 'block'
    document.querySelector('.desktop-navigation-menu').style.display = 'block'
    document.querySelector('.cta-container').style.display = 'block'
    document.querySelector('.service').style.display = 'block'
}


// document.querySelector('#cart-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const titleElement = document.querySelector('.showcase-title1');
//     const priceElement = document.querySelector('.pricesoap'); // Note the class name change
//     const itemTitle = titleElement.textContent;
//     const priceText = priceElement.textContent;
//     const price = parseFloat(priceText.replace('$', ''));
//     const dataToSend = {
//         name: itemTitle,
//         price: price,
//     };

//     fetch('http://localhost:8080/addtocart', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Item Title stored in the database:', data);
//         })
//         .catch((error) => {
//             console.error('Error storing item title:', error);
//         });
// });

document.getElementById("searchBtn").addEventListener("click", function () {
    HideHomePage()
    const productName = document.getElementById("searchField").value;
    const productNameInUpperCase = productName.toUpperCase();

    fetch("http://localhost:8080/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: productNameInUpperCase }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = ""
            data.data.forEach((item)=>{
                html += ` <div class="col-xs-12 col-md-6 bootstrap snippets bootdeys">
    
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
                </div>`
            })
            document.getElementById("js-display-items").innerHTML = html
            
        })
        .catch(error => {
            console.error("Error:", error);
        });
});


// const itemLinks = document.querySelectorAll(".item-link");
// const baseURL = "/items"; // The base URL for your items route

// itemLinks.forEach(link => {
//   link.addEventListener("click", function (event) {
//     event.preventDefault();
//     const storedData = localStorage.getItem("userdata");
//     const retrievedUserData = JSON.parse(storedData);
//     const itemName = link.getAttribute("data-item"); // Get the item name
//     const token = urlParams.get('token') || retrievedUserData.token; // Replace with your dynamic token logic

//     const url = `${baseURL}?item=${itemName}&token=${token}`;
//     window.location.href = url; // Redirect to the dynamic URL
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const token1 = token; // Replace with your actual token value
//     const searchBtn = document.getElementById("personoutline");
//     searchBtn.addEventListener("click", function () {
//       const url = `/ordereditems?token=${token1}`;
//       window.location.href = url;
//     });
//   });

//   document.addEventListener("DOMContentLoaded", function () {
//     const token1 = token; // Replace with your actual token value
//     const searchBtn = document.getElementById("searchBtn");
//     searchBtn.addEventListener("click", function () {
//       const url = `/inventory/?token=${token1}`;
//       window.location.href = url;
//     });
//   });

//   var urlParams = new URLSearchParams(window.location.search);

//   var token = urlParams.get('token');

//   document.addEventListener("DOMContentLoaded", function () {
//     var cartButton = document.querySelector(".action-btn a");
//     if (cartButton) {
//       cartButton.href = "/cart/?token=" + token;
//     } else {
//       console.error("Button not found in the DOM.");
//     }
//   });
