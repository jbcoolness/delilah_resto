const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const middleware = require('../middleware/middleware')


router.post('/', middleware.validationClient, ordersControllers.createOrders);
router.get('/', middleware.validationClient, ordersControllers.getOrders);
router.get('/:id', middleware.validationClient, ordersControllers.getIdOrdersClient);
router.get('/:order/:user', middleware.validationClient, middleware.validationAdmin, ordersControllers.getIdOrdersAdmin);
router.patch('/:id', middleware.validationClient, middleware.validationAdmin, ordersControllers.updateOrders)


module.exports = router