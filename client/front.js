


window.addEventListener("load", initSite)



function initSite() {
    console.log("fungerar fortfarande")
    mapProducts()
    // getSpecProducts(4)
    addProdButton()
}
let productID = 0;
mapProducts()
function addProdButton() {

    document.getElementById("add-product-button").addEventListener("click", displayForm)
}

function displayForm() {
    console.log("lägg till prpodukter ")
    let form = document.getElementById("formContainer")

    form.style.top = "7rem"

}
function closeForm() {
    let form = document.getElementById("formContainer")
    form.style.top = "100rem"

}



function clearInput() {
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""

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
        // div.id = "product-cards"
        div.innerHTML = `
        <div class="product-padding product-info">
        <div>
       
        <p><b>Produkt:</b> ${prod.title}</p>
        </div>
        <div>
        
        <p><b>Innehåll:</b> ${prod.content}</p>
        </div>
        <div>
        
        <p><b>Pris:</b> ${prod.price}</p>
        </div>
        </div>
        <div class="product-padding">
        
        <button onclick="deleteProducts(${prod.id}) " id="delete-button">Delete</button>
        <button onclick="getProductID(${prod.id}) " id="edit-button">Edit</button>
        </div>

        
        
     `
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
    console.log(JSON.stringify(specProduct.title))
    // var newdiv = document.createElement('div')
    // newdiv.innerHTML = `<h3>${specProduct.title}</h3>`
    // document.getElementById("productView").appendChild(newdiv);

}
async function serchProducts() {
    let products = await getProducts()
    let prodName = document.getElementById("prodTitle").value
    const foundProdukt = products.find((prod) => {
        return prod.title == prodName
    })
    console.log(foundProdukt.id)
    console.log(foundProdukt.title)
    getSpecProducts(foundProdukt.id)
    document.getElementById("productView").innerHTML = ""
    var newdiv = document.createElement('div')
    newdiv.innerHTML = `<h3>${foundProdukt.title}</h3><h3>${foundProdukt.content}</h3>`
    document.getElementById("foundProductview").appendChild(newdiv);


}
// Lägg till produkt
async function addProduct() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let price = document.getElementById("pris").value;
    let body = {
        title: title,
        content: content,
        price: price
    }
    objekt = JSON.stringify(body)
    await makeRequest('/products/add-product', 'POST', objekt)
    mapProducts()
    clearInput()


}
// redigera produkt
async function editProducts(id, body) {
    await makeRequest(`/products/edit-product/${id}`, "PUT", body)
    mapProducts()
    clearInput()
}
function getProductID(id) {
    //open form
    productID = id
    const form = document.getElementById("editFormContainer")
    form.style.display = "flex"
    console.log(id)


}
function closeEditForm() {
    const form = document.getElementById("editFormContainer")
    form.style.display = "none"
}
async function getValuesFromForm() {
    let newTitle = document.getElementById("newEdit-title").value;
    let newContent = document.getElementById("newEdit-content").value;
    let newPrice = document.getElementById("newEdit-price").value;
    let newid = productID
    let products = await getProducts()
    let foundProduct = products.find((prod) => {
        return prod.id == newid
    })
    let newProduct = {
        title: newTitle ? newTitle : foundProduct.title,
        content: newContent ? newContent : foundProduct.content,
        price: newPrice ? newPrice : foundProduct.price,
        id: foundProduct.id
    }
    let newObjekt = JSON.stringify(newProduct)
    editProducts(newProduct.id, newObjekt)

}

// Ta bort produkt
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

