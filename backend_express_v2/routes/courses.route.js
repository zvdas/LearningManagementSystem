// import necessary modules
const express = require('express');
const multer = require('../config/multer.config');
const { 
    getCourses, 
    getCourseById, 
    createCourse, 
    updateCourseById, 
    deleteCourseById, 
    coursePhotoUpload 
} = require('../controllers/courses.controller');

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
    .delete(deleteCourseById);

router
    .put('/:id/photo', multer.upload.single('courseCoverPhoto'), coursePhotoUpload)

// export router    
module.exports = router;