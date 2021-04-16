

const fs = require('fs')

// Hämtar alla produkter från data.json
exports.getProducts = (req, res, next) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Cannot read file${err}`)
        } else {
            const jsnData = JSON.parse(data)
            res.status(200).json(jsnData)
            // res.status(201).json({
            //     message: 'Products found sucessfully!',
            //     productList: jsnData
            // });
        }
    })

}

// Lägger till produkt i data.json
exports.postProducts = (req, res, next) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`cant read file${err}`)
        } else {
            const productData = JSON.parse(data)
            const title = req.body.title;
            const content = req.body.content;
            const price = req.body.price
            let newId = 0;
            productData.forEach((prod) => {
                if (prod.id > newId) {
                    newId = prod.id
                }
            })
            newId++
            productData.push({ title: req.body.title, content: req.body.content, id: newId, price: req.body.price })
            const jsndata = JSON.stringify(productData)

            fs.writeFile('./data.json', jsndata, 'utf8', (err) => {

                if (err) {
                    console.log(`Error writing file: ${err}`);
                } else {
                    console.log(`File is written successfully!`);
                }

            });

            res.status(201).json({
                message: 'product created sucessfully!',
                product: { id: Math.random(5).toString(), title: title, content: content, }

            });
        }
    })
}

// Hämtar specifik produkt data.json
exports.getSpecProduct = (req, res, next) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`error reading file from disk${err}`);
        } else {
            const jsnData = JSON.parse(data);
            ///läs från db
            const id = req.params.id;
            const foundProduct = jsnData.find((product) => {
                return product.id == id
            })
            if (!foundProduct) {
                res.json({ "ERROR": "Produkten kunde inte hittas" })
            } else {
                res.status(201).json({
                    message: 'Product found sucessfully!',
                    product: foundProduct
                });
            }

        }
    })
}

// Redigerar en produkt från data.json
exports.editProduct = (req, res, next) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`error reading file in edit prod${err}`)
        } else {
            const jsnData = JSON.parse(data)

            const id = req.params.id
            let existingproduct = jsnData.find((prod) => {
                return prod.id == id
            })
            console.log(existingproduct)
            let newProduct = {
                title: req.body.title,
                content: req.body.content,
                price: req.body.price,
                id: existingproduct.id
            }
            let filterdProductList = [...jsnData.filter((prod) => {
                return prod.id != existingproduct.id
            })]

            let newProductList = [...filterdProductList, newProduct]
            const newJsnData = JSON.stringify(newProductList)
            fs.writeFile('./data.json', newJsnData, 'utf8', (err) => {

                if (err) {
                    console.log(`Error writing file: ${err}`);
                } else {
                    console.log(`File is written successfully!`);
                    console.log(newProduct)
                    res.status(201).json({
                        message: 'product edited sucessfully!',
                        product: { id: newProduct.id, title: newProduct.title, content: newProduct.content, price: newProduct.price }
                    });
                }

            });


        }
    })
}

// Tar bort en produkt från data.json
exports.deleteProduct = (req, res, next) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file${err}`)
        } else {
            let jsnData = JSON.parse(data)
            const newid = req.params.id
            let newProductList = jsnData.filter((prod) => {
                return prod.id != newid
            })
            newJsnData = JSON.stringify(newProductList)
            fs.writeFile('./data.json', newJsnData, 'utf8', (err) => {
                if (err) {
                    console.log(`Error writing to file${err}`)
                } else {
                    res.status(201).json({
                        message: 'product Deleted sucessfully!',
                        productlist: newProductList
                    });
                }
            })

        }
    })

}
