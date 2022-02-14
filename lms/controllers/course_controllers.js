const { stringify } = require('mocha/lib/utils');
const courseModel = require('../models/course-model');

const courseRepository = require('../repositories/course-repository');

// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'uploads')
//     },
//     filename: function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })

// var upload = multer({storage: storage})

exports.getAddCourseForm = (req,res,next) => {
    res.render('course_new.pug',{});
}

// upload.single('courseCoverPhoto'), 
exports.addCourse = (req,res,next) => {
    // res.json({file: req.courseCoverPhoto});
    // console.log(req.body);
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, req.body.courseCoverPhoto)
    courseRepository.add(course);
    courseRepository.getAll((courses) => {
        res.render('dashboard.pug',{ title: 'Courses', courses: courses });
    });
}

exports.getListCourseView = (req,res,next) => {
    courseRepository.getAll((courses) => {
        res.render('dashboard.pug',{ title: 'Courses', courses: courses });
    });
}

exports.getUpdateCourseView = (req,res,next) => {
    const id = req.query.id;
    courseRepository.getById(id,(result) => {
        res.render('course_update.pug',{ title: 'Courses', courses: result });
    });
}

exports.updateCourse = (req,res,next) => {
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, req.body.courseCoverPhoto, req.body._id)
    courseRepository.update(course,() => {
        courseRepository.getAll((courses) => {
            res.render('dashboard.pug',{ title: 'Courses', courses: courses });
        });
    });
}

exports.getDeleteCourseView = (req,res,next) => {
    courseRepository.getAll((courses) => {
        res.render('course_delete.pug',{ title: 'Courses', courses: courses });
    });
}

exports.deleteCourse = (req,res,next) => {
    const id = req.query.id;
    courseRepository.delete((id),() => {
        console.log("Course Deleted" + id);
        courseRepository.getAll((courses) => {
            res.render('course_delete.pug',{ title: 'Courses', courses: courses });
        });
    })
}