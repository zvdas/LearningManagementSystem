const express = require('express');

const path = require('path');

const userController = require('../controllers/user_controller');

const router = express.Router();

router.get('/new', userController.getAddUserForm);

router.post('/new', userController.addUser);

router.post('/toEdit', userController.authenticateUser);

router.get('/edit', userController.getEditUserView);

router.post('/edit', userController.editUser);

router.get('/delete', userController.deleteUser);

module.exports = router;