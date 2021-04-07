const express = require('express');

const productController = require('../controllers/products')

const router = express.Router();

// GET /products/products
router.get('/products', productController.getProducts);

module.exports = router;

