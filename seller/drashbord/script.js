function DisplayDrashBord() {
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'block';
    document.querySelector('.outer-container').style.display = 'none';
}

function DisplayEdit() {
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'block';
    document.querySelector('.outer-container').style.display = 'none';

}

function Deletedata() {
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.outer-container').style.display = 'block';
    

}

function DisplayCalender() {
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.getElementById("event-wrapper").style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.outer-container').style.display = 'none';


}

function DisplayEventForm() {
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.outer-container').style.display = 'none';

}


function DisplayAddProduct() {
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    document.querySelector('.outer-container').style.display = 'none';

}
function DisplayUsers(){
    document.getElementById('snippetContent').style.display = 'block';
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.outer-container').style.display = 'none';

}
function DisplayOrders(){
    document.getElementById('snippetContent').style.display = 'none';
    document.getElementById('workersnip').style.display = 'none';
    document.getElementById('Inventorysnip').style.display = 'none';
    document.querySelector('.container-p-y').style.display = 'none';
    document.getElementById('update-form-admin-container').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.outer-container').style.display = 'none';
}



var sellerData = localStorage.getItem('sellerdata');
if (sellerData) {
    // Parse the JSON string to convert it into a JavaScript object
    var sellerObject = JSON.parse(sellerData);
    document.querySelector('.seller-name').innerHTML = ExtractUserName(sellerObject.username)
    document.querySelector('.seller-target').innerHTML = `Congratulations ${ExtractUserName(sellerObject.username)}`
} else {
    showToast('Please Login as seller', "Danger", 0);
}
const formData = {
    "token": sellerObject.token
}



function DisplayData() {
    fetch("http://localhost:8080/sellerdrashboarddetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message)
                document.querySelector('.orders-count').innerHTML = `${data.message.orders}k`
                document.querySelector('.completed-count').innerHTML = `${data.message.orderscompleted}k`
                document.querySelector('.inprogress-count').innerHTML = `${data.message.ordespending}k`
                document.querySelector('.sales-count').innerHTML = `${data.message.totalamount}k`
                document.querySelector('.target-persentage').innerHTML = `${calculatePercentage(10000, data.message.totalamount)}% of target 🚀`

            } if (data.error) {
                showToast(data.error, "Error", 0)
            }

        })
        .catch(error => {
            showToast(error.message, "Danger", 0);
        });
}
DisplayData()



function ExtractUserName(name) {
    var adminname = "";
    for (let i = 0; i < name.length; i++) {
        if (name[i] == "@") {
            return adminname.toUpperCase();
        } else {
            adminname += name[i];
        }
    }
    return adminname.toUpperCase();
}


function LogOut() {
    localStorage.removeItem("sellerdata")
    window.location.href = "/ecom/seller/signin"
}



function DisplayProducts() {
    fetch("http://localhost:8080/getallproducts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            let html = ""
            if (data.message) {
                data.message.forEach((element, index) => {
                    html += `<tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-sm me-3">
                          <img src="data:image/jpeg;base64,${element.image}" alt="Avatar" class="rounded-circle" />
                        </div>
                        <div>
                          <h6 class="mb-0 text-truncate">${element.itemname.toUpperCase()}</h6>
                        </div>
                      </div>
                    </td>
                    <td class="text-truncate">${element.itemcategory}</td>
                    <td class="text-truncate">
                      <i class="mdi  mdi-24px text-danger me-1"></i>${element.price}
                    </td>
                    <td class="text-truncate">${element.quantity}</td>
                    <td class="text-truncate">${element.sellerquantity}</td>`
                    if (element.sellerquantity == 0) {
                        html += `<td><span class="badge bg-label-warning rounded-pill">Inactive</span></td>
                        </tr>`
                    } else {
                        html += `<td><span class="badge bg-label-warning rounded-pill">Active</span></td>
                        </tr>`
                    }

                })
                document.querySelector('.js-workers').innerHTML = html

            }

        })
        .catch(error => {
            showToast(error.message, "Danger", 0);
        });
}
DisplayProducts()



function calculatePercentage(totalAmount, receivedAmount) {
    if (totalAmount <= 0) {
        showToast("Total amount should be greater than zero.", "Info", 1);
        return null;
    }

    const percentage = (receivedAmount / totalAmount) * 100;
    return percentage.toFixed(2); // Round to two decimal places
}



function showToast(str, war, no) {
    const toastContainer = document.querySelector('.toast-container');
    const title = document.querySelector('.js-toast-title');
    const content = document.querySelector('.js-toast-content');
    const image = document.querySelector('.js-toast-img');

    // Reset classes, width, and height
    toastContainer.className = 'toast-container';
    toastContainer.style.width = 'auto';
    toastContainer.style.height = 'auto';

    if (no == 0) {
        image.src = './images/danger.webp';
        toastContainer.classList.add('danger-color');
    } else if (no == 1) {
        image.src = './images/info.svg';
        toastContainer.classList.add('info-color');
    } else if (no == 2) {
        image.src = './images/warning.jpg';
        toastContainer.classList.add('warning-color');
    } else if (no == 3) {
        image.src = './images/success.png';
        toastContainer.classList.add('success-color');
    }
    title.innerHTML = `${war}`;
    content.innerHTML = `${str}`;

    // Calculate and set the container width and height

    const containerWidth = title.length + content.length + 500; // Add some padding

    toastContainer.style.width = `${containerWidth}px`;


    // Add transition effect
    toastContainer.style.transition = 'all 0.5s ease-in-out';

    toastContainer.style.display = 'block';
    setTimeout(() => {
        toastContainer.style.opacity = 1;
    }, 1);

    // Hide the toast container after 5 seconds
    setTimeout(() => {
        toastContainer.style.opacity = 0;
        setTimeout(() => {
            toastContainer.style.display = 'none';
        }, 1 * 1000);
    }, 3000);
}


function DisplayListUsers() {
    DisplayUsers()
    
    fetch("http://localhost:8080/buyedcustomer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            let html = ""

            data.message.forEach(customer => {

                html += `
            <tr class="candidates-list customer-list">
            <td class="title">
              <div class="thumb"> <img class="img-fluid"
                  src="https://previews.123rf.com/images/jenjawin/jenjawin1904/jenjawin190400251/120265520-account-icon-outline-vector-eps10-user-profile-sign-web-icon-with-check-mark-glyph-user-authorized.jpg" alt="">
              </div>
              <div class="candidate-list-details">
                <div class="candidate-list-info">
                  <div class="candidate-list-title customer">
                    <h5 class="mb-0"><a href="#">${customer.name.toUpperCase()}</a></h5>
                  </div>
                  <div class="candidate-list-option">
                    <ul class="list-unstyled">
                      <li><i class="fas fa-filter pr-1"></i>${customer.email}
                      </li>
                      <li><i class="fas fa-map-marker-alt pr-1"></i>${customer.address}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </td>
            <td class="candidate-list-favourite-time text-center"> <a
                class="candidate-list-favourite order-2 text-danger" href="#"></a>
              <span class="candidate-list-time order-1">${customer.phonenumber}</span></td>
            <td>
              <ul class="list-unstyled mb-0 d-flex justify-content-end">
              <li onclick="ViewData('${customer.email}','customer');recentPage = 'customer';"><a  class="text-info" data-toggle="tooltip" title="" data-original-title="Edit"><i
              class="fas fa-eye"></i></a>
              </li>
              </ul>
            </td>
          </tr>`;

            });
            document.querySelector('.user-list-body').innerHTML = html;
        })
        .catch(error => {
            showToast(error, "Error", 0);
        });
}

function DeleteData(email, coll) {
    const requestData = {
        collection: "",
        idValue: email
    };
    const collection = "inventory";
    requestData.collection = collection,



        // Send a DELETE request to your server to delete the data
        fetch("http://localhost:8080/deletedata", {
            method: "POST", // Use DELETE method to delete data
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                ;
                if (data === true) {
                    showToast("Deleted Sucessfull", "Success", 3)
                    if (coll == 'cus') {
                        DisplayListUsers()
                    } else if (coll == "sel") {
                        DisplayListSeller()
                    } else if (coll == "inven") {
                        DisplayListInventory()
                    }

                } else {
                    showToast("Error in Deleting", "Danger", 0)
                }
            })
            .catch(error => {
                showToast(error.message, "Error", 0);
            });


}




function DisplayListInventory() {
    console.log("Displaylist")

    document.getElementById('Inventorysnip').style.display = 'block';
    fetch("http://localhost:8080/getallproducts", {
        method: "POST", // Use DELETE method to delete data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

        .then(response => response.json())
        .then(data => {
            let html = ""

            data.message.forEach(customer => {

                html += `
            <tr class="candidates-list inventory-list">
            <td class="title">
              <div class="thumb"> <img class="img-fluid"
              src="data:image/jpeg;base64,${customer.image}" alt="">
              </div>
              <div class="candidate-list-details">
                <div class="candidate-list-info">
                  <div class="candidate-list-title inventory">
                    <h5 class="mb-0"><a href="#">${customer.itemname.toUpperCase()}</a></h5>
                  </div>
                  <div class="candidate-list-option">
                    <ul class="list-unstyled">
                      <li><i class="fas fa-filter pr-1"></i>${customer.itemcategory.toUpperCase()}
                      </li>
                      <li><i class="fas fa-map-marker-alt pr-1"></i>${customer.quantity}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </td>
            <td class="candidate-list-favourite-time text-center"> <a
                class="candidate-list-favourite order-2 text-danger" href="#"></a>
              <span class="candidate-list-time order-1">${customer.price}</span></td>
            <td>
              <ul class="list-unstyled mb-0 d-flex justify-content-end">
              <li onclick="ViewData('${customer.itemname}','inventory');recentPage = 'inventory';"><a  class="text-info" data-toggle="tooltip" title="" data-original-title="Edit"><i
              class="fas fa-eye"></i></a>
              </li>
              <li onclick="EditData('${customer.itemname}','inventory');recentPage = 'inventory';"><a  class="text-info" data-toggle="tooltip" title="" data-original-title="Edit"><i
              class="fas fa-pencil-alt"></i></a>
              </li>
                <li  onclick="DeleteData('${customer.itemname}','inven');recentPage = 'inventory';"><a class="text-danger" data-toggle="tooltip" title=""
                    data-original-title="Delete"><i class="far fa-trash-alt"></i></a></li>
              </ul>
            </td>
          </tr>`;

            });
            document.querySelector('.inventory-list-body').innerHTML = html;
            document.getElementById('workersnip').style.display = 'none';
            document.querySelector('.container-p-y').style.display = 'none';
            document.getElementById('snippetContent').style.display = 'none';
            document.getElementById('Inventorysnip').style.display = 'block';
        })
        .catch(error => {
            showToast(error, "Error", 0);
        });
}

function EditData(id, coll) {
    document.getElementById("updatecollection").value = coll;
    document.getElementById("idname").value = id;
    populateFieldOptions();
    DisplayEdit();
}





document.getElementById("delete-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const collection = document.getElementById("collection").value;
    const idValue = document.getElementById("id").value;

    const requestData = {
        collection: collection,
        idValue: idValue
    };

    // Send a DELETE request to your server to delete the data
    fetch("http://localhost:8080/deletedata", {
        method: "POST", // Use DELETE method to delete data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            if (data === true) {
                showToast("Deleted Sucessfull", "Success", 3)
                document.getElementById("id").value = "";
            } else {
                showToast("Error in Deleting", "Danger", 0)
            }
        })
        .catch(error => {
            const resultDiv = document.getElementById("result-container");
            resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});


const updateFormElement = document.getElementById("update-form-admin");
const collectionSelectElement = document.getElementById("updatecollection");
const fieldSelectElement = document.getElementById("field");

const collectionselectOptions = {
    customer: ["name", "email", "phonenumber", "age", "password", "firstname", "lastname", "houseno", "streetname", "city", "pincode"],
    inventory: ["itemcategory", "itemname", "price", "quantity"],
    seller: ["sellername", "selleremail", "password", "phoneno", "address"],
};
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function populateFieldOptions() {
    const selectedCollection = collectionSelectElement.value || customer;
    const options = collectionselectOptions[selectedCollection] || [];

    // Clear existing options
    fieldSelectElement.innerHTML = "";

    // Add new options
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = capitalizeFirstLetter(option);
        fieldSelectElement.appendChild(optionElement);
    });
}
populateFieldOptions()



document.getElementById("update-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const updatecollection = document.getElementById("updatecollection").value;
    const idname = document.getElementById("idname").value;
    const field = document.getElementById("field").value;
    const newvalue = document.getElementById("newvalue").value;

    const requestData = {
        collection: updatecollection,
        email: idname,
        field: field,
        newvalue: newvalue
    };
    console.log(requestData)

    fetch("http://localhost:8080/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {

            if (data) {
                showToast("Updated Successfully", "Success", 3)
                document.getElementById("update-form").reset();
            } else {
                showToast("Update Failes", "Danger", 0)
                document.getElementById("update-form").reset();
            }
        })
        .catch(error => {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});













function DisplayCompletedOrders() {
    DisplayOrders()
    document.getElementById('workersnip').style.display = 'block';
    fetch("http://localhost:8080/completedorders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            let html = ""
    
            data.message.forEach(order => {

                html += `
                <tr class="candidates-list">
                    <td class="title">
                        <div class="thumb">
                            <img class="img-fluid" src="data:image/jpeg;base64,${order.itemstobuy.image}" alt="">
                        </div>
                        <div class="candidate-list-details">
                            <div class="candidate-list-info">
                                <div class="candidate-list-title customer">
                                    <h5 class="mb-0"><a href="#">${order.itemstobuy.productname.toUpperCase()}</a></h5>
                                </div>
                                <div class="candidate-list-option">
                                    <ul class="list-unstyled">
                                        <li><i class="fas fa-filter pr-1"></i>${order.itemstobuy.itemcategory}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="candidate-list-favourite-time text-right">
                        <a class="candidate-list-favourite order-2 text-danger" href="#"></a>
                        <span class="candidate-list-time order-1">${order.deliverydate}</span>
                    </td>
                    <td class="text-right">${order.itemstobuy.quantity}</td>
                    <td class="text-right">${order.totalamount}</td>
                    <td class="action text-right">
                        <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li onclick="ViewData('${order.orderid}','order');recentPage = 'order';">
                                <a class="text-danger" data-toggle="tooltip" title="View" data-original-title="View">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </td>
                    <td><span class="badge bg-label-warning rounded-pill">Completed</span></td>
                </tr>`;

            });
            document.querySelector('.worker-list-body').innerHTML = html;
        })
        .catch(error => {
            showToast(error, "Error", 0);
        });
}

function capitalizeFirstLetter(str) {
    if (str.length === 0) {
        return str; 
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

function DisplayPendingOrders() {
    DisplayOrders()
    document.getElementById('workersnip').style.display = 'block';
    document.querySelector('.container-p-y').style.display = 'none';
    fetch("http://localhost:8080/pendingorders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            let html = ""
            console.log(data.result)
            data.message.forEach(order => {

                html += `
                <tr class="candidates-list">
                    <td class="title">
                        <div class="thumb">
                            <img class="img-fluid" src="data:image/jpeg;base64,${order.itemstobuy.image}" alt="">
                        </div>
                        <div class="candidate-list-details">
                            <div class="candidate-list-info">
                                <div class="candidate-list-title customer">
                                    <h5 class="mb-0"><a href="#">${order.itemstobuy.productname.toUpperCase()}</a></h5>
                                </div>
                                <div class="candidate-list-option">
                                    <ul class="list-unstyled">
                                        <li><i class="fas fa-filter pr-1"></i>${order.itemstobuy.itemcategory}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="candidate-list-favourite-time text-right">
                        <a class="candidate-list-favourite order-2 text-danger" href="#"></a>
                        <span class="candidate-list-time order-1">${order.deliverydate}</span>
                    </td>
                    <td class="text-right">${order.itemstobuy.quantity}</td>
                    <td class="text-right">${order.totalamount}</td>
                    <td class="action text-right">
                        <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li onclick="ViewData('${order.orderid}','order');recentPage = 'order';">
                                <a class="text-danger" data-toggle="tooltip" title="View" data-original-title="View">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </td>
                    <td><span class="badge bg-label-warning rounded-pill">Pending</span></td>
                </tr>
            `;

            });
            document.querySelector('.worker-list-body').innerHTML = html;
        })
        .catch(error => {
            showToast(error, "Error", 0);
        });
}

function DisplayallOrders() {
    DisplayOrders()
    document.getElementById('workersnip').style.display = 'block';
    document.querySelector('.container-p-y').style.display = 'none';
    fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            let html = ""
            console.log(data.message)
            data.message.forEach(order => {

                html += `
                <tr class="candidates-list">
                    <td class="title">
                        <div class="thumb">
                            <img class="img-fluid" src="data:image/jpeg;base64,${order.itemstobuy.image}" alt="">
                        </div>
                        <div class="candidate-list-details">
                            <div class="candidate-list-info">
                                <div class="candidate-list-title customer">
                                    <h5 class="mb-0"><a href="#">${order.itemstobuy.productname.toUpperCase()}</a></h5>
                                </div>
                                <div class="candidate-list-option">
                                    <ul class="list-unstyled">
                                        <li><i class="fas fa-filter pr-1"></i>${order.itemstobuy.itemcategory}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="candidate-list-favourite-time text-right">
                        <a class="candidate-list-favourite order-2 text-danger" href="#"></a>
                        <span class="candidate-list-time order-1">${order.deliverydate}</span>
                    </td>
                    <td class="text-right">${order.itemstobuy.quantity}</td>
                    <td class="text-right">${order.totalamount}</td>
                    <td class="action text-right">
                        <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li onclick="ViewData('${order.orderid}','order');recentPage = 'order';">
                                <a class="text-danger" data-toggle="tooltip" title="View" data-original-title="View">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </td>
                    <td><span class="badge bg-label-warning rounded-pill">${capitalizeFirstLetter(order.status.delivered)}</span></td>
                </tr>`;

            });
            document.querySelector('.worker-list-body').innerHTML = html;
        })
        .catch(error => {
            showToast(error, "Error", 0);
        });
}


function DisplayYettoGiveOrders() {
    DisplayOrders()
    document.getElementById('workersnip').style.display = 'block';
    document.querySelector('.container-p-y').style.display = 'none';
    fetch("http://localhost:8080/yettodeliverorders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            let html = ""
            console.log(data.result)
            data.message.forEach(order => {

                html += `
                <tr class="candidates-list">
                    <td class="title">
                        <div class="thumb">
                            <img class="img-fluid" src="data:image/jpeg;base64,${order.itemstobuy.image}" alt="">
                        </div>
                        <div class="candidate-list-details">
                            <div class="candidate-list-info">
                                <div class="candidate-list-title customer">
                                    <h5 class="mb-0"><a href="#">${order.itemstobuy.productname.toUpperCase()}</a></h5>
                                </div>
                                <div class="candidate-list-option">
                                    <ul class="list-unstyled">
                                        <li><i class="fas fa-filter pr-1"></i>${order.itemstobuy.itemcategory}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="candidate-list-favourite-time text-right">
                        <a class="candidate-list-favourite order-2 text-danger" href="#"></a>
                        <span class="candidate-list-time order-1">${order.deliverydate}</span>
                    </td>
                    <td class="text-right">${order.itemstobuy.quantity}</td>
                    <td class="text-right">${order.totalamount}</td>
                    <td class="action text-right">
                        <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li onclick="ViewData('${order.orderid}','order');recentPage = 'order';">
                                <a class="text-danger" data-toggle="tooltip" title="View" data-original-title="View">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </td>
                    <td><span class="badge bg-label-warning rounded-pill">${capitalizeFirstLetter(order.status.delivered)}</span></td>
                </tr>`;

            });
            document.querySelector('.worker-list-body').innerHTML = html;
        })
        .catch(error => {
            showToast(error, "Error", 0);
        });
}


function ViewData(id, profession) {


    fetch("http://localhost:8080/getdata", {
        method: "POST", // Use DELETE method to delete data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id, collection: profession })
    })

        .then(response => response.json())
        .then(data => {
            console.log(data.message)

            let html = ""
            if (profession == 'inventory') {
                html = `
                <div class="container" style="width:1500px;max-width:1500px; margin-left:300px">
                <i class="fas fa-arrow-left back-icon" onclick="BackButton()"></i>
                <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                <div class="panel panel-white profile-widget">
                <div class="row">
                <div class="col-sm-12">
                <div class="image-container bg2">
                <img src="data:image/jpeg;base64,${data.message.image}" class="avatar" alt="avatar" height="100px" >
                </div>
                </div>
                <div class="col-sm-12">
                <div class="details">
                <h4>${data.message.itemname} <i class="fa fa-sheild"></i></h4>
                <div class="mg-top-10">
                </div>
                </div>
                </div>
                </div>
                </div>
                <div class="row">
                <div class="col-sm-6"   >
                <div class="panel panel-white border-top-purple">
                <div class="panel-heading">
                <h3 class="panel-title" style="height:30px;">Item Info</h3>
                </div>
                <div class="panel-body" style="padding:30px; border-radius:5px">
                <div class="body-section">
                <h5 class="section-heading">Item Name : <span class="message">${data.message.itemname}</span></h5>
                </div>
                <div class="body-section">
                <h5 class="section-heading">Category :
                <span class="message">${data.message.itemcategory}</span>
               </h5>
               </div>
                <div class="body-section">
                <h5 class="section-heading">Price : <span class="message" >${data.message.price}  </span> </h5>
                </div>
                <div class="body-section">
                <!-- <a href="#" class="btn btn-purple btn-sm">Edit</a> -->
                </div>
                </div>
                </div>
    
                <div class="panel">
              
    
                </div>
                </div>
                <div class="col-sm-6">
                <div class="panel panel-white border-top-green">
                <div class="panel-heading">
                <h3 class="panel-title">Seller Info</h3>
              
                
                
                </div>
                <div class="panel-body" style="padding:30px">
    
    
                <div class="body-section">
                <h5 class="section-heading">Seller Name : <span class="message">  ${data.message.sellername}</span></h5>
                </div>

                <div class="body-section">
                <h5 class="section-heading">Quantity : <span class="message">${data.message.quantity}</span></h5>
                </div>
    
                <div class="body-section">
                <h5 class="section-heading">Available Quantity:  <span class="message">${data.message.sellerquantity}</span></h5>
                </div>


            
                </div>
                </div>
                <div class="panel ">
    
                </div>
      
    
                
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            `;

            } else if (profession == 'customer') {
                html = `
                <div class="container" style="width:1500px;max-width:1500px; margin-left:300px">
                <i class="fas fa-arrow-left back-icon" onclick="BackButton()"></i>
                <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                <div class="panel panel-white profile-widget">
                <div class="row">
                <div class="col-sm-12">
                <div class="image-container bg2">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="avatar" alt="avatar" height="100px" >
                </div>
                </div>
                <div class="col-sm-12">
                <div class="details">
                <h4>${data.message.name} <i class="fa fa-sheild"></i></h4>
                <div class="mg-top-10">
                </div>
                </div>
                </div>
                </div>
                </div>
                <div class="row">
                <div class="col-sm-6"   >
                <div class="panel panel-white border-top-purple">
                <div class="panel-heading">
                <h3 class="panel-title" style="height:30px;">Account Info</h3>
                </div>
                <div class="panel-body" style="padding:30px; border-radius:5px">
                <div class="body-section">
                <h5 class="section-heading">Account Name : <span class="message">${data.message.name}</span></h5>
                </div>
                <div class="body-section">
                <h5 class="section-heading">ID : <span class="message" >${data.message.customerid}  </span> </h5>
                </div>
                <div class="body-section">
                <h5 class="section-heading">EmailVerified : <span class="message" >${data.message.isemailverified}  </span> </h5>
                </div>
                </div>
                </div>
                </div>

                <div class="col-sm-6">
                <div class="panel panel-white border-top-green">
                <div class="panel-heading">
                <h3 class="panel-title">User Info</h3>
               
                </div>
                <div class="panel-body" style="padding:30px">
    
    
                <div class="body-section">
                <h5 class="section-heading">Name : <span class="message">${data.message.name}</span></h5>
                </div>
    
                <div class="body-section">
                <h5 class="section-heading">Telephone:  <span class="message">${data.message.phonenumber}</span></h5>
                </div>
                <div class="body-section">
                <h5 class="section-heading">Email : <span class="message">${data.message.email}</span></h5>
                </div>
                <div class="body-section">
                <h5 class="section-heading">Address : <span class="message">${data.message.address}</span></h5>
                </div>
            
                </div>
                </div>
                <div class="panel ">
    
                </div>
      
    
                
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            `;
            } 
            document.querySelector('.display-view').innerHTML = html;
            document.querySelector('.display-view').style.display = 'block';
        })
        .catch(error => {
            console.log(error)
        });

}





var recentPage = ''
function BackButton() {
    if (recentPage == 'inventory') {
        DisplayListInventory()
    } else if (recentPage == 'seller') {
        DisplayListSeller()
    } else if (recentPage == 'customer') {
        DisplayListUsers()
    } else if (recentPage == 'worker') {
        DisplayAllWorkers()
    }
}

$(document).ready(async function () {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: await fetchEventsFromBackend(),

        eventClick: function (event) {
            showTodoList(event);
        },
        dayClick: function () {
            // Handle day click (add to-do item)
            DisplayEventForm();
        }

    });

    async function fetchEventsFromBackend() {
        var adminData = localStorage.getItem('admindata');
        var adminObject = JSON.parse(adminData);
        const data = {
            email: adminObject.username,
        };

        try {
            const response = await fetch("http://localhost:8080/getevent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const apiResponse = await response.json();
            const fullCalendarEvents = convertApiResponseToFullCalendarEvents(apiResponse.message);

            console.log('FullCalendar Events:', fullCalendarEvents); // Log the events before returning

            return fullCalendarEvents;
        } catch (error) {
            return [];
        }
    }

    function convertApiResponseToFullCalendarEvents(apiResponse) {
        console.log(apiResponse)
        return apiResponse.map(event => {
            console.log('Converted Event:', event.title);
            return {
                title: event.title,
                start: event.start,
                end: event.end,
                todos: event.todos
            };
        });
    }

    function showTodoList(event) {
        const todos = event.todos || [];
        let todoList = `To-Do :`;
        if (todos.length === 0) {
            todoList += 'No items.';
        } else {
            todos.forEach((item, index) => {
                todoList += ` ${item}`;
            });
        }
        showToast(todoList, "Info", 3)
    }



});


document.getElementById("event-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const start = document.getElementById("event-start").value;
    const end = document.getElementById("event-end").value;
    const title = document.getElementById("event-title").value;
    const todo = document.getElementById("event-todo").value;
    var adminData = localStorage.getItem('admindata');
    var adminObject = JSON.parse(adminData);
    console.log(adminData.username)

    const requestData = {
        email: adminObject.username,
        start,
        end,
        title,
        todos: [todo]
    };
    console.log(requestData)

    // Send a DELETE request to your server to delete the data
    fetch("http://localhost:8080/addevent", {
        method: "POST", // Use DELETE method to delete data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {

            if (data.message) {
                showToast(data.message, "Success", 3)
                document.getElementById("event-form").reset()
            } else if (data.error) {
                showToast(data.error, "Warning", 0)
            }
        })
        .catch(error => {
            showToast(data.error, "Warning", 0)
        });

});




// Add Product 


function AddFeatures() {
    console.log("In AddFeatures");
    var newInput = document.createElement('input');
    newInput.type = 'address';
    newInput.className = 'form-control features';
    newInput.placeholder = 'Features';
    newInput.style.cssText = 'border-top: none; border-left: none; border-right: none; margin-left: 10px; outline: none; width: 300px;';
    var newSpan = document.createElement('span');
    newSpan.className = 'lnr lnr-home';
    var newDiv = document.createElement('div');
    newDiv.className = 'form-holder';
    newDiv.style.display = 'flex';
    newDiv.appendChild(newSpan);
    newDiv.appendChild(newInput);
    document.getElementById("features-holder").appendChild(newDiv);
    getFeaturesArray()
}

function getFeaturesArray() {
    var featuresInputs = document.querySelectorAll('.features'); // Get all inputs with class 'features'
    var featuresArray = [];

    featuresInputs.forEach(function (input) {
        featuresArray.push(input.value);
    });
    return featuresArray;
}

function AddProducts(event) {
    event.preventDefault();
    console.log("called add")
    if (!validateForm()) {
        return
    }
    const storedData = localStorage.getItem("sellerdata");
    const retrievedUserData = JSON.parse(storedData);

    const imageFile = document.getElementById("product-image").files[0];
    const imageinput = document.getElementById("product-image");

    if (imageinput.files.length === 0) {
        showToast("Please select an image", "Info", 1);
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const base64Image = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));// Extracting base64 data from data URL
        const data = {
            sellername: retrievedUserData.token,
            itemcategory: (document.getElementById("product-category").value).toUpperCase(),
            itemname: (document.getElementById("product-name").value).toUpperCase(),
            price: Number(document.getElementById("price").value),
            quantity: document.getElementById("quantity").value,
            sellerquantity: Number(document.getElementById("stock-available").value),
            image: base64Image,
            shortdis: document.getElementById("short-description").value,
            longdis: document.getElementById("long-description").value,
            features: getFeaturesArray(),
        }

        console.log(data)

        // Send the seller data as JSON in the request body
        fetch('http://localhost:8080/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(output => {
                if (output.message) {
                    if (output.message == "Item Name Already exists") {
                        showToast(output.message, "Info", 3)
                        return
                    }
                    showToast(output.message, "Info", 3)
                    document.getElementById("product-form").reset()
                } else if (output.error) {
                    showToast(output.message, "Error", 0)
                }
            })
            .catch(error => {
                showToast(error, 'Error', 0);
            });
    };

    reader.readAsArrayBuffer(imageFile);


}

function validateForm() {
    var inputs = document.querySelectorAll('.product');
    var isEmpty = false;

    inputs.forEach(function (input) {
        if (input.value.trim() === '') {
            isEmpty = true;
            showToast(input.placeholder + ' is empty', "Info", 3);
            return false
        }
    });

    if (!isEmpty) {
        return true
    }
}


