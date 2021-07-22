const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const middleware = require('../middleware/middleware')

router.get('/', middleware.validationUser, usersControllers.getUser);
router.post('/register', usersControllers.registerUser);
router.post('/register_admin', middleware.validationAdmin, usersControllers.registerUserAdmin);
router.post('/login', usersControllers.loginUser);
router.delete('/:id', middleware.validationAdmin, usersControllers.deleteUsers);

module.exports = router