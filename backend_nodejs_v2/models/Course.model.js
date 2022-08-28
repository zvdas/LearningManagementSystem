// import necessary modules
const mongoose = require('mongoose');

// create course schema
const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'Please enter a course name']
    },
    courseCategory: {
        type: String,
        // required: [true, 'Please select a course category'],
        enum: [
            'NodeJS',
            'Python',
            'Java',
            'Angular',
            'React',
            'Web Development',
            'Data Science',
            'Big Data Engineering'
        ]
    },
    courseOneLiner: {
        type: String,
    },
    courseDuration: {
        type: Number
    },
    courseLanguage: {
        type: String
    },
    courseDescription: {
        type: String
    },
    courseLessons: {
        type: String
    },
    courseCoverPhoto: {
        Type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

/*
    courseCoverPhoto: {
        data: Buffer.toString('base64'),
        contentType: String
    },
*/

// upload file as string before save
CourseSchema.pre('save', function(){
    console.log(req.body);
});

// export user schema
module.exports = mongoose.model('Course', CourseSchema);