const express = require('express');

const productRoutes = require('./routes/products');

const app = express();

app.use('/products', productRoutes)

app.use(express.json());

app.listen(3000)