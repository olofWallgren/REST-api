const productList = [{
    title: "dummy1",
    content: "dummy content 1",
    id: 1

}, {
    title: "dummy2",
    content: "dummy content 2",
    id: 2
}
]


// Hämtar alla produkter
exports.getProducts = (req, res, next) => {
    res.status(200).json(productList)
}

// lägger till produkt 
exports.postProducts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    let newId = 0;
    productList.forEach((prod) => {
        if (prod.id > newId) {
            newId = prod.id
        }
    })
    newId++
    console.log(newId)

    productList.push({ title: req.body.title, content: req.body.content, id: newId })
    console.log(req.body)
    // create post in db
    res.status(201).json({
        message: 'product created sucessfully!',
        product: { id: Math.random(5).toString(), title: title, content: content, }
    });

}

// Hämtar specifik produkt
exports.getSpecProduct = (req, res, next) => {
    const id = req.params.id;
    const foundProduct = productList.find((product) => {
        return product.id == id
    })
    if (!foundProduct) {
        res.json({ "Error": "produkten finns ej" })
    }
    res.json(foundProduct)
}

// Redigerar en produkt
exports.editProduct = (req, res, next) => {
    const id = req.params.id
    let existingproduct = productList.find((prod) => {
        return prod.id == id
    })
    existingproduct = {
        title: req.body.title,
        content: req.body.content,
        id: existingproduct.id
    }
    let filterdProductList = [...productList.filter((prod) => {
        return prod.id != existingproduct.id
    })]
    console.log(filterdProductList)
    let newProductList = [...filterdProductList, existingproduct]



    res.status(200).json(newProductList)
}

// Tar bort en produkt
exports.deleteProduct = (req, res, next) => {
    const newid = req.params.id
    let newProductList = productList.filter((prod) => {
        return prod.id != newid
    })


    res.json(newProductList)
}
exports.newProducts = productList