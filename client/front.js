window.addEventListener("load", initSite)

function initSite() {
    console.log("fungerar fortfarande")
    getProducts()
    getSpecProducts(4)
}

/// hämtar alla produkter
async function getProducts() {
    const products = await makeRequest("/products/view-products", "GET")
    console.log(products)
}

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