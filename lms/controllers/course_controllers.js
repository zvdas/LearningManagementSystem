const courseModel = require('../models/course-model');

const courseRepository = require('../repositories/course-repository');

exports.getAddCourseForm = (req,res,next) => {
    res.render('course_new.pug',{});
}

exports.getListCourseView = (req,res,next) => {
    res.render('dashboard.pug',{});
}

exports.getUpdateCourseView = (req,res,next) => {
    res.render('course_update.pug',{});
}

exports.getDeleteCourseView = (req,res,next) => {
    res.render('course_delete.pug',{});
}

exports.addCourse = (req,res,next) => {
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, req.body.courseCoverPhoto, req.body.id)
    courseRepository.add(course);
    courseRepository.getAll((courses) => {
        res.render('dashboard.pug',{ title: 'Courses', courses: courses });
    });
}

exports.updateCourse = (req,res,next) => {

}

exports.deleteCourse = (req,res,next) => {

}