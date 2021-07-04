const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const middleware = require('../middleware/middleware');

// middleware.validationAdmin,

router.get('/', productsControllers.getProducts);

router.post('/create', productsControllers.createProducts);

router.put('/update/:id', productsControllers.updateProducts);

router.delete('/delete/:id', productsControllers.deleteProducts);

module.exports = router