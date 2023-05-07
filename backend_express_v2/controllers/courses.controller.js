// import necessary modules
const fs = require('fs');
const Course = require('../models/Course.model');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get all courses
// @route   GET /api/v1/auth/courses
// @access  Public
exports.getCourses = asyncHandler(async(req, res, next) => {
    const course = await Course.find();

    res
        .status(200)
        .json({ success: true, count: course.length, data: course })
});

// @desc    Get course by id
// @route   GET /api/v1/auth/courses/:id
// @access  Public
exports.getCourseById = asyncHandler(async(req, res, next) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        return next(new ErrorResponse(`Course with '${req.params.id}' not found`, 404));
    }

    res
        .status(200)
        .json({ success: true, data: course })
})

// @desc    Create a new course
// @route   POST /api/v1/auth/courses
// @access  Private/Publisher
exports.createCourse = asyncHandler(async(req, res, next) => {
    if(await req.body.courseCoverPhoto === "") {
        req.body.courseCoverPhoto = Buffer.from(fs.readFileSync('assets/images/no image available.jpg', 'base64'), 'base64').toString('base64');
    }

    const course = await Course.create(req.body);

    if(!course) {
        return next(new ErrorResponse(`Course with '${req.params.id}' not found`, 404));
    }

    res
        .status(201)
        .json({ success: true, message: 'Course created successfully' });
})

// @desc    Update course by id
// @route   PUT /api/v1/auth/courses/:id
// @access  Private/Publisher
exports.updateCourseById = asyncHandler(async(req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if(!course) {
        return next(new ErrorResponse(`Course with '${req.params.id}' not found`, 404));
    }

    res.status(200)
        .json({ 
            success: true, 
            message: `Course with ID '${req.params.id}' updated successfully`
        });
})

// @desc    Delete course by id
// @route   DELETE /api/v1/auth/courses/:id
// @access  Private/Publisher
exports.deleteCourseById = asyncHandler(async(req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if(!course) {
        return next(new ErrorResponse(`Course with '${req.params.id}' not found`, 404));
    }

    res
        .status(200)
        .json({ 
            success: true,
            message: `Course with ID '${req.params.id}' deleted successfully`
        })
})

// @desc    upload photo for course
// @route   PUT /api/v1/courses/:id/photo
// @access  Private/Publisher
exports.coursePhotoUpload = asyncHandler(async(req, res, next) => {
    // req.body.courseCoverPhoto = Buffer.from(fs.readFileSync(req.file.path, 'base64'), 'base64').toString('base64');
    req.body.courseCoverPhoto = req.file.buffer.toString('base64');
    const image = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if(!course) {
        return next(new ErrorResponse(`Course with '${req.params.id}' not found`, 404));
    }

    res
        .status(200)
        .json({
            success: true,
            message: `Image uploaded to course with ID '${req.params.id}' successful`
        })
})