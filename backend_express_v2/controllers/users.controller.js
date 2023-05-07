// import necessary modules
const User = require('../models/User.model');

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = async(req, res, next) => {


    const user = await User.find();

    res
        .status(200)
        .json({ success: true, count: user.length, data: user })
}

// @desc    Get user by id
// @route   GET /api/v1/auth/users/:id
// @access  Private/Admin
exports.getUserById = async(req, res, next) => {
    const user = await User.findById(req.params.id);

    res
        .status(200)
        .json({ success: true, data: user })
}

// @desc    Create a new user
// @route   POST /api/v1/auth/users
// @access  Private/Admin
exports.createUser = async(req, res, next) => {
    const user = await User.create(req.body);

    res
        .status(201)
        .json({ success: true, message: 'User created successfully' });
}

// @desc    Update user by id
// @route   PUT /api/v1/auth/users/:id
// @access  Private/Admin
exports.updateUserById = async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200)
        .json({ 
            success: true, 
            message: `User with ID '${req.params.id}' updated successfully`
        });
}

// @desc    Delete user by id
// @route   DELETE /api/v1/auth/users/:id
// @access  Private/Admin
exports.deleteUserById = async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res
        .status(200)
        .json({ 
            success: true,
            message: `User with ID '${req.params.id}' deleted successfully`
        })
}