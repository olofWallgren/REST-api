


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
    console.log("nu körs map")
    const products = await getProducts()
    document.getElementById("productView").innerHTML = ""
    products.map((prod) => {
        var div = document.createElement('div');
        div.className = "product-card"
        div.innerHTML = `
        
        <h3>${prod.title}</h3>
        <p>${prod.content}</p>
        <button>Edit</button>
        <button onclick="deleteProducts(${prod.id}) " id="delete-button">Delete</button>
     `
        // const DelButton = document.createElement("button")
        // DelButton.innerHTML = "Delete"
        // document.getElementById("productView").appendChild(DelButton)
        // DelButton.addEventListener("click", (e) => {
        //     e.preventDefault()
        //     window.onload()
        //     deleteProducts(prod.id)
        // })

        document.getElementById("productView").appendChild(div);

    })
}
function buttondelete(id) {
    // let button = document.getElementById("delete-button")
    // button.addEventListener("click",)
    console.log(id)
}

/// hämtar specifik produkt
async function getSpecProducts(id) {
    const specProduct = await makeRequest(`/products/spec-product/${id}`, "GET")
    console.log(specProduct)
}

async function addProduct() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let body = {
        title: title,
        content: content
    }
    objekt = JSON.stringify(body)
    await makeRequest('/products/add-product', 'POST', objekt)
    mapProducts()

}

function editProducts() {

}


async function deleteProducts(id) {
    await makeRequest(`/products/delete-product/${id}`, "DELETE")
    mapProducts()
}

/// gör request
async function makeRequest(url, method, body) {

    const response = await fetch(url, {
        method: method,
        body: body, // json.stinigfy(body)
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}

