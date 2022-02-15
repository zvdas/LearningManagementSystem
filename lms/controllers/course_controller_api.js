const courseRepository = require('../repositories/course-repository');

const courseModel =  require('../models/course-model');

const path = require('path');

exports.add = (req,res) => {
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, req.body.courseCoverPhoto)
    courseRepository.add(course);
    res.status(200).send();
}

exports.getAll = (req,res) => {
    courseRepository.getAll(courses);
    res.status(200).send(courses);
}

exports.getById = (req,res) => {
    const id = req.path.toString().replace("/","");
    courseRepository.getById(id, (course) => {
        if(course){
            res.status(200).send(course);
        }else{
            res.status(400).send("Error");
        }
    });
}

exports.update = (req,res) => {
    const course = new courseModel(req.body.courseName, req.body.courseCategory, req.body.courseOneLiner, req.body.courseDuration, req.body.courseLanguage, req.body.courseDescription, req.body.courseLessons, req.body.courseCoverPhoto, req.body._id)
    courseRepository.update((course), () => {
        courseRepository.getById(course._id, (courseResult) => {
            res.status(200).send(courseResult);
        });
    });
}

exports.delete = (req,res) => {
    const id = req.path.toString().replace("/","");
    courseRepository.delete(id, () => {
        res.status(200).send();
    });
}