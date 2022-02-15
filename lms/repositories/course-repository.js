const { ObjectId } = require('mongodb');
const database = require('../configurations/mongodb-config');

exports.add = (course,callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.insertOne({ courseName: course.courseName, courseCategory: course.courseCategory, courseOneLiner: course.courseOneLiner, courseDuration: course.courseDuration, courseLanguage: course.courseLanguage, courseDescription: course.courseDescription, courseLessons: course.courseLessons, courseCoverPhoto: course.courseCoverPhoto })
};

exports.getAll = (callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.find().toArray()
        .then((courses) => {
            return callback(courses);
        });
};

exports.getById = (id,callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.findOne({ _id: ObjectId(id) })
        .then((courses) => {
            return callback(courses);
        });
};

exports.update = (course,callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.findOneAndUpdate({ _id: ObjectId(course._id) }, { $set: { courseName: course.courseName, courseCategory: course.courseCategory, courseOneLiner: course.courseOneLiner, courseDuration: course.courseDuration, courseLanguage: course.courseLanguage, courseDescription: course.courseDescription, courseLessons: course.courseLessons, courseCoverPhoto: course.courseCoverPhoto }}, {})
        .then(() => {
            return callback();
        });
};

exports.delete = (id,callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.deleteOne({ _id: ObjectId(id) })
        .then((result) => {
            return callback();
        });
};