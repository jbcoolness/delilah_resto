const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const middleware = require('../middleware/middleware')

router.get('/', middleware.validationAdmin, usersControllers.getUser);
router.get('/:id', middleware.validationClient, usersControllers.getUser);
router.post('/register', usersControllers.registerUser);
router.post('/login', usersControllers.loginUser);

module.exports = router