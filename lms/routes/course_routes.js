const express = require('express');

const courseController = require('../controllers/course_controller');

const router = express.Router();

router.get('/new', courseController.getAddCourseForm);

router.post('/new', courseController.addCourse);

router.get('/dashboard', courseController.getListCourseView);

router.get('/update', courseController.getUpdateCourseView);

router.post('/update', courseController.updateCourse);

router.get('/deletev', courseController.getDeleteCourseView);

router.get('/delete', courseController.deleteCourse);

module.exports = router;