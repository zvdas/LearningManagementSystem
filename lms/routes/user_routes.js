const express = require('express');

const path = require('path');

const userController = require('../controllers/user_controllers');

const router = express.Router();

router.get('/add', userController.getAddUserForm);

router.post('/add',userController.addUser);

router.get('/edit', userController.getEditUserView);

router.post('/edit', userController.updateUser);

module.exports = router;