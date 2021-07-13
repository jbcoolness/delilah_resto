const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const middleware = require('../middleware/middleware')


router.post('/', middleware.validationUser, ordersControllers.createOrders);
router.get('/', middleware.validationUser, ordersControllers.getOrders);
router.get('/:id', middleware.validationUser, ordersControllers.getIdOrdersClient);
router.get('/:order/:user', middleware.validationUser, middleware.validationAdmin, ordersControllers.getIdOrdersAdmin);
router.patch('/:id', middleware.validationUser, middleware.validationAdmin, ordersControllers.updateOrders)


module.exports = router