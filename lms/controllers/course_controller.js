const fs = require('fs');

const courseModel = require('../models/course-model');

const ImageModel = require('../models/image-model');

const courseRepository = require('../repositories/course-repository');

const imageRepository = require('../repositories/image-repository');

global.courseCategories = ["Web Development", "Data Science", "Business Analysis", "Project Management", "Big Data Engineering"];

exports.getAddCourseForm = (req,res,next) => {
    res.render('course_new.pug',{ users: CurrentUserDetails[0] });
}

exports.addCourse = (req,res,next) => {
    const base64 = fs.readFileSync(req.file.path,"base64");
    const buffer = Buffer.from(base64, "base64");
    const imageString = buffer.toString('base64');
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, imageString)
    courseRepository.add(course);
    courseRepository.getAll((courses) => {
        res.render('dashboard.pug',{ title: 'Courses', courses: courses, users: CurrentUserDetails[0], courseCategories: courseCategories });
    });
}

exports.getListCourseView = (req,res,next) => {
    courseRepository.getAll((courses) => {
        res.render('dashboard.pug',{ title: 'Courses', courses: courses, users: CurrentUserDetails[0] });
    });
}

exports.getUpdateCourseView = (req,res,next) => {
    const id = req.query.id;
    courseRepository.getById(id,(result) => {
        res.render('course_update.pug',{ title: 'Courses', courses: result, users: CurrentUserDetails[0], courseCategories: courseCategories });
    });
}

exports.updateCourse = (req,res,next) => {
    const base64 = fs.readFileSync(req.file.path,"base64");
    const buffer = Buffer.from(base64, "base64");
    const imageString = buffer.toString('base64');
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, imageString, req.body._id)
    courseRepository.update(course,() => {
        courseRepository.getAll((courses) => {
            res.render('dashboard.pug',{ title: 'Courses', courses: courses, users: CurrentUserDetails[0] });
        });
    });
}

exports.deleteCourse = (req,res,next) => {
    if(req.query.id===undefined) {
        courseRepository.getAll((courses) => {
            res.render('course_delete.pug',{ title: 'Courses', courses: courses, users: CurrentUserDetails[0] });
        });
    }else{
        const id = req.query.id;
        courseRepository.delete((id),() => {
            courseRepository.getAll((courses) => {
                res.render('course_delete.pug',{ title: 'Courses', courses: courses, users: CurrentUserDetails[0] });
            });
        })
    }
};

exports.getImage = (req,res,next) => {
    imageRepository.getAll((images) => {
        res.render('course_image.pug', { images: images });
    });
};

exports.uploadImage = (req,res,next) => {
    const base64 = fs.readFileSync(req.file.path,"base64");
    const buffer = Buffer.from(base64, "base64");
    const imageString = buffer.toString('base64');
    console.log(req.file.mimetype)
    const image = new ImageModel (imageString,req.file.mimetype);
    imageRepository.add(image);
    imageRepository.getAll((images) => {
        res.render('course_image.pug', { images: images })
    });
};