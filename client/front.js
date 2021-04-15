


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
        div.id = "product-cards"
        div.innerHTML = `
        <div class="product-padding product-info">
        <div>
       
        <p><b>Produkt:</b> ${prod.title}</p>
        </div>
        <div>
        
        <p><b>Innehåll:</b> ${prod.content}</p>
        </div>
        </div>
        <div class="product-padding">
        
        <button onclick="deleteProducts(${prod.id}) " id="delete-button">Delete</button>
        </div>

        <div id="edit-forms" class="editForm borderTop" >
        <h3>Ändra produkt</h3>
        <form id="edit-form" class="editForm" onsubmit="return false;" method="PUT">
        <label for="title">Titel</label>
         <input class="editInput" id="edit-title" type="text" name="title" />
         <label for="content">Innehåll</label>
         <input class="editInput" type="text" id="edit-content" name="content" /> 

         <button
         onclick="editProducts(${prod.id})"
         class="form-button"
         type="submit"
       >
         Ändra
       </button>
         </form>
         </div>
        
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
    clearInput()


}

async function editProducts(id) {
    let editTitle = document.getElementById("edit-title").value;
    let editContent = document.getElementById("edit-content").value;
    let newBody = {
        title: editTitle,
        content: editContent
    }
    newObjekt = JSON.stringify(newBody)
    await makeRequest(`/products/edit-product/${id}`, "PUT", newObjekt)
    mapProducts()
    clearInput()
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

