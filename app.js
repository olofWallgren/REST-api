const express = require('express');

const bodyParser = require('body-parser')

const productRoutes = require('./routes/products');

const app = express();

//app.use(bodyParser.urlencoded())
//app.use(bodyParser.json())
app.use(express.static('./client'))

app.use(express.json());


app.use('/products', productRoutes)

app.listen(3000)