const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const middleware = require('../middleware/middleware')


router.post('/', middleware.validationClient, ordersControllers.createOrders);
router.get('/', middleware.validationUser, ordersControllers.getOrders);
router.get('/:id', middleware.validationClient, ordersControllers.getIdOrdersClient);
router.get('/:user/:order', middleware.validationAdmin, ordersControllers.getIdOrdersAdmin);
router.patch('/:id', middleware.validationAdmin, ordersControllers.updateOrders)


module.exports = router