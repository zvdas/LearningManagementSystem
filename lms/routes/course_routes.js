const express = require('express');

const courseController = require('../controllers/course_controller');

const multerConfig = require('../configurations/multer-config');

const router = express.Router();

router.get('/new', courseController.getAddCourseForm);

router.post('/new', courseController.addCourse);

router.get('/dashboard', courseController.getListCourseView);

router.get('/update', courseController.getUpdateCourseView);

router.post('/update', courseController.updateCourse);

router.get('/delete', courseController.deleteCourse);

router.get('/image', courseController.getImage);

router.post('/image', multerConfig.upload.single('imageupload'), courseController.uploadImage);

module.exports = router;