const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const middleware = require('../middleware/middleware')


router.post('/', middleware.validationClient, ordersControllers.createOrders);
router.get('/', middleware.validationUser, ordersControllers.getOrders);
router.get('/:id', middleware.validationUser, ordersControllers.getIdOrdersClient);
router.get('/:user/:order', middleware.validationAdmin, ordersControllers.getIdOrdersAdmin);
router.patch('/:id', middleware.validationAdmin, ordersControllers.updateOrders)
router.delete('/:id', middleware.validationAdmin, ordersControllers.deleteOrders)


module.exports = router