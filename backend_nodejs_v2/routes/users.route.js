// import necessary modules
const express = require('express');

const { getUsers, getUserById, createUser, updateUserById, deleteUserById } = require('../controllers/users.controller');
const User = require('../models/User.model');

// configure router
const router = express.Router();

// set routes (combine with similar paths)
router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// export router    
module.exports = router;