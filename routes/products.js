const express = require('express');

const productController = require('../controllers/products')

const router = express.Router();

// GET /products/view-products   visarr alla produkter
router.get('/view-products', productController.getProducts);

// POST /products/add-products    lägger till produkt
router.post('/add-product', productController.postProducts)

// GET /products/spec-product/:id    hämtar specifik produkt
router.get('/spec-product/:id', productController.getSpecProduct)

// PUT /products/edit-product/:id    ändrar produkt
router.put('/edit-product/:id', productController.editProduct)

// DELETE /products/delete-product/:id   tar bort produkt
router.delete('delete-product/:id', productController.deleteProduct)


module.exports = router;

