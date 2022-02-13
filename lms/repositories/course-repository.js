const database = require('../configurations/mongodb-config');

exports.add = (course,callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.insertOne({ courseName: course.courseName, courseCategory: course.courseCategory, courseOneLiner: course.courseOneLiner, courseDuration: course.courseDuration, courseLanguage: course.courseLanguage, courseDescription: course.courseDescription, courseLessons: course.courseLessons, courseCoverPhoto: course.courseCoverPhoto })
}

exports.getAll = (callback) => {
    const courseCollection = database.getCourseCollection();
    courseCollection.findOne()
        .then((courses) => {
            return callback(courses);
        });
}

exports.update = (user,callback) => {

}

exports.delete = (user,callback) => {

}