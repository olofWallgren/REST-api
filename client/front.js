


window.addEventListener("load", initSite)

function initSite() {
    console.log("fungerar fortfarande")
    mapProducts()
    getSpecProducts(4)
    addProdButton()
}

function addProdButton() {

    document.getElementById("add-product-button").addEventListener("click", displayForm)
}

function displayForm() {
    console.log("lägg till prpodukter ")
    let form = document.getElementById("formContainer")
    if (form.style.display == "none") {
        form.style.display = "flex"
    } else {
        form.style.display = "none"
    }
}


/// hämtar alla produkter
async function getProducts() {
    return await makeRequest("/products/view-products", "GET")
}


/// visar all produkter
async function mapProducts() {
    const products = await getProducts()
    products.map((prod) => {
        document.getElementById("productView").insertAdjacentHTML("afterend", `
        <div class="product-card">
        <h3>${prod.title}</h3>
        <p>${prod.content}</p>
        <button>Edit</button>
        <button>Delete</button>
        </div>`);
    })
}


/// hämtar specifik produkt
async function getSpecProducts(id) {
    const specProduct = await makeRequest(`/products/spec-product/${id}`, "GET")
    console.log(specProduct)
}

function addProduct() {

}

function editProducts() {

}

function deleteProducts() {

}

/// gör request
async function makeRequest(url, method, body) {

    const response = await fetch(url, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}

