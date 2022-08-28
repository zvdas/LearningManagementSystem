// import necessary modules
const mongoose = require('mongoose');

// create user schema
const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    role: {
        type: String,
        enum: [
            'student',
            'teacher',
            'publisher'
        ],
        required: [true, 'Please select role']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 6,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// export user schema
module.exports = mongoose.model('User', UserSchema);