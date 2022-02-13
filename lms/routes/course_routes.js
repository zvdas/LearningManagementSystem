const express = require('express');

const path = require('path');

const courseController = require('../controllers/course_controllers');

const router = express.Router();

router.get('/new', courseController.getAddCourseForm);

router.post('/new', courseController.addCourse);

router.get('/dashboard', courseController.getListCourseView);

router.get('/update', courseController.getUpdateCourseView);

router.get('/delete', courseController.getDeleteCourseView);

module.exports = router;