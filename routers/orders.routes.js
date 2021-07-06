const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers')


router.post('/create', ordersControllers.createOrders)


module.exports = router