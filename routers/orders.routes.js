const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const middleware = require('../middleware/middleware')


router.post('/create', ordersControllers.createOrders);
router.get('/', middleware.validationUser, ordersControllers.getOrders)


module.exports = router