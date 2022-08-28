// import necessary modules
const express = require('express');
const multer = require('multer');
const { getCourses, getCourseById, createCourse, updateCourseById, deleteCourseById } = require('../controllers/courses.controller');
const Course = require('../models/Course.model');

// configure router
const router = express.Router();

// set routes (combine with similar paths)
router
    .route('/')
    .get(getCourses)
    .post(createCourse)

router
    .route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .put(multer({}).single('courseCoverPhoto'), updateCourseById)
    .delete(deleteCourseById);

// export router    
module.exports = router;