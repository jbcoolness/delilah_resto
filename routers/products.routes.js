const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const middleware = require('../middleware/middleware');

router.get('/', productsControllers.getProducts);

router.post('/create', middleware.validationUser, middleware.validationAdmin, productsControllers.createProducts);

router.put('/update/:id', middleware.validationUser, middleware.validationAdmin, productsControllers.updateProducts);

router.delete('/delete/:id', middleware.validationUser, middleware.validationAdmin, productsControllers.deleteProducts);

module.exports = router