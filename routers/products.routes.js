const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const middleware = require('../middleware/middleware');

router.get('/', productsControllers.getProducts);

router.post('/', middleware.validationAdmin, productsControllers.createProducts);

router.put('/:id', middleware.validationAdmin, productsControllers.updateProducts);

router.delete('/:id',middleware.validationAdmin, productsControllers.deleteProducts);

module.exports = router