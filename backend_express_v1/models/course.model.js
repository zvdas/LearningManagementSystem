const courses = [];

module.exports = class CourseModel {

    constructor(courseName,courseCategory,courseOneLiner,courseDuration,courseLanguage,courseDescription,courseLessons,courseCoverPhoto,id){
        this.courseName = courseName;
        this.courseCategory = courseCategory;
        this.courseOneLiner = courseOneLiner;
        this.courseDuration = courseDuration;
        this.courseLanguage = courseLanguage;
        this.courseDescription = courseDescription;
        this.courseLessons = courseLessons;
        this.courseCoverPhoto = courseCoverPhoto;
        this._id = id;
    }
    
}