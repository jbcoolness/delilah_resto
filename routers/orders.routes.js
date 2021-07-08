const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const middleware = require('../middleware/middleware')


router.post('/create', middleware.validationUser, ordersControllers.createOrders);
router.get('/', middleware.validationUser, ordersControllers.getOrders);
router.get('/:id', middleware.validationUser, ordersControllers.getIdOrders);
router.put('/update/:id', middleware.validationUser, ordersControllers.updateOrders)


module.exports = router