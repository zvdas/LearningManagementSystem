// import necessary libraries
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('./async');

// protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // set token from bearer token in request header
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.token) {
        // set token from cookie
        token = req.cookies.token;
    }

    // ensure token exists
    if(!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
});

// grant access to specific roles
exports.authorized = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return(new ErrorResponse(`User role '${req.user.role}' is not authorized to access this route`, 403));
        }
        next();
    }
}