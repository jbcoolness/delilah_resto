const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const middleware = require('../middleware/middleware');

router.get('/', middleware.validationToken, productsControllers.getProducts);

router.post('/create', middleware.validationAdmin, productsControllers.createProducts);

router.put('/update/:id', middleware.validationAdmin, productsControllers.updateProducts);

router.delete('/delete/:id', middleware.validationAdmin, productsControllers.deleteProducts);

module.exports = router