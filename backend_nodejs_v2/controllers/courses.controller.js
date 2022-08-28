// import necessary modules
const Course = require('../models/Course.model');

// @desc    Get all courses
// @route   GET /api/v1/auth/courses
// @access  Public
exports.getCourses = async(req, res, next) => {


    const course = await Course.find();

    res
        .status(200)
        .json({ success: true, count: Course.length, data: course })
}

// @desc    Get course by id
// @route   GET /api/v1/auth/courses/:id
// @access  Public
exports.getCourseById = async(req, res, next) => {
    const course = await Course.findById(req.params.id);

    res
        .status(200)
        .json({ success: true, data: course })
}

// @desc    Create a new course
// @route   POST /api/v1/auth/courses
// @access  Private/Publisher
exports.createCourse = async(req, res, next) => {
    // const course = await Course.create(req.body);
    
    const course = req.body;

    // console.log(req.file.buffer.toString('base64'));

    res
        .status(201)
        .json({ success: true, message: 'Course created successfully', data: course });
}

// @desc    Update course by id
// @route   PUT /api/v1/auth/courses/:id
// @access  Private/Publisher
exports.updateCourseById = async(req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200)
        .json({ 
            success: true, 
            message: `Course with ID "${req.params.id}" updated successfully`
        });
}

// @desc    Delete course by id
// @route   DELETE /api/v1/auth/courses/:id
// @access  Private/Publisher
exports.deleteCourseById = async(req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    res
        .status(200)
        .json({ 
            success: true,
            message: `Course with ID "${req.params.id}" deleted successfully`
        })
}

// @desc    upload photo for course
// @route   PUT /api/v1/courses/:id/photo
// @access  Private/Publisher
exports.coursePhotoUpload = async(req, res, next) => {
    
}