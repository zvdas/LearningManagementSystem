// install necessary libraries
const crypto = require('crypto');
const User = require("../models/User.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./async");
const sendEmail = require('../utils/sendEmail');

// get token from model, create a cookie & send a response
const sendTokenResponse = (user, statusCode, res) => {
    // create token
    const token = user.getSignedJwtToken();

    const options = {
        // set token to expire in 1 day
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
} 

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    // create user
    const user = User.create(req.body);

    sendTokenResponse(user, 200, res)
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // destructure request body
    const { email, password } = req.body;

    // validate email & password
    if(!email || !password) {
        return(new ErrorResponse('Please provide the registered email address & password', 400));
    }

    // verify user
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid user', 401));
    }

    // verify password
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid password', 401));
    }

    sendTokenResponse(user, 200, res);
})

// @desc    logout user / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
    res
        .cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true })
        .status(200)
        .json({ success: true, message: 'User logged out successfully' });
})

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private: User
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res
        .status(200)
        .json({ success: true, data: user });
})

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private: User
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = { name: req.user.id, email: req.body.email };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, { new: true, runValidators: true } );

    res
        .status(200)
        .json({ success: true, data: user, message: 'User details updated successfully' });
})

// @desc    Update user password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private: User
exports.updatePassword = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user.id).select('+password');

    // verify current password
    if(!await user.matchPassword(req.body.currentPassword)) {
        return next(new ErrorResponse('Incorrect Password', 401));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendTokenResponse(user, 200, res);
})

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgotpassword
// @access  Private: User
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorResponse(`User with email address '${req.body.email} not found`, 404));
    }

    // get password reset token
    const resetToken = user.getResetPasswordToken();

    // send password reset token to the database
    await user.save({ validateBeforeSave: false });

    // create reset url 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this message because you (or someone else) has requested the reset of a password. Please make a PUT request to \n\n${resetUrl}`;

    try {
        await sendEmail({ user: user.email, subject: 'Password Reset Token', message });

        res
            .status(200)
            .json({ success: true, data: 'Email sent' });
    } catch (error) {
        console.log(error);

        user.resetPasswordToken = undefined;

        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }

    res
        .status(201)
        .json({ success: true, data: user });
})

// @desc    reset password
// @route   POST /api/v1/auth/resetpassword/:resettoken
// @access  Private: User
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // get hashed token
    const resetPasswordToken = 
    crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');
    
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if(!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // set new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
})