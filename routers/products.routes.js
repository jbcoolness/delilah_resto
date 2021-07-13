const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const middleware = require('../middleware/middleware');

router.get('/', productsControllers.getProducts);

router.post('/', middleware.validationUser, middleware.validationAdmin, productsControllers.createProducts);

router.put('/:id', middleware.validationUser, middleware.validationAdmin, productsControllers.updateProducts);

router.delete('/:id', middleware.validationUser, middleware.validationAdmin, productsControllers.deleteProducts);

module.exports = router