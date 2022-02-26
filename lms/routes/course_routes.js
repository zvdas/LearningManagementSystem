const express = require('express');

const courseController = require('../controllers/course_controller');

const multerConfig = require('../configurations/multer-config');

const router = express.Router();

router.get('/new', courseController.getAddCourseForm);

router.post('/new', multerConfig.upload.single('courseCoverPhoto'), courseController.addCourse);

router.get('/dashboard', courseController.getListCourseView);

router.get('/update', courseController.getUpdateCourseView);

router.post('/update', multerConfig.upload.single('courseCoverPhoto'), courseController.updateCourse);

router.get('/delete', courseController.deleteCourse);

module.exports = router;