const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const middleware = require('../middleware/middleware');

router.get('/', productsControllers.getProducts);

router.post('/create', middleware.validationUser, productsControllers.createProducts);

router.put('/update/:id', middleware.validationUser, productsControllers.updateProducts);

router.delete('/delete/:id', middleware.validationUser, productsControllers.deleteProducts);

module.exports = router