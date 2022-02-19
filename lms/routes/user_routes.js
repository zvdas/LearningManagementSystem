const express = require('express');

const userController = require('../controllers/user_controller');

const authenticator = require('../controllers/authenticator');

const router = express.Router();

router.get('/new', userController.getAddUserForm);

router.post('/new', authenticator.authenticateLogin);

router.get('/edit', userController.getEditUserView);

router.post('/edit', userController.editUser);

router.get('/delete', userController.deleteUser);

module.exports = router;