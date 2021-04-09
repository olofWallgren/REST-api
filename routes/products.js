const express = require('express');

const productController = require('../controllers/products')

const router = express.Router();

// GET /products/add-products
router.get('/view-products', productController.getProducts);
router.post('/add-product', productController.postProducts)
router.get('/spec-product/:id', productController.getSpecProduct)


module.exports = router;

