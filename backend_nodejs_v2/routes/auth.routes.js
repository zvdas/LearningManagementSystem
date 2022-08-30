// import necessary libraries
const express = require('express');

const {
    register,
    login, 
    forgotPassword,
    resetPassword,
    getCurrentUser,
    updateDetails,
    updatePassword,
    logout
} = require('../controllers/auth.controller');

const User = require('../models/User.model');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/currentuser', protect, getCurrentUser);

router.post('forgotpassword', forgotPassword);

router.put('/resetpassword/:resettoken', resetPassword);

router.put('/updatedetails', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);

module.exports = router;