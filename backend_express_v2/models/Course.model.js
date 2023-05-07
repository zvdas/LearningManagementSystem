// import necessary modules
const mongoose = require('mongoose');
const fs = require('fs');

// create course schema
const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        unique: true,
        required: [true, 'Please enter a course name']
    },
    courseCategory: {
        type: String,
        required: [true, 'Please select a course category'],
        enum: [
            'NodeJS',
            'Python',
            'Front Web Development',
            'Backend Web Development',
            'Angular',
            'React',
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
        // default: Buffer.from(fs.readFileSync('assets/images/no image available.jpg', 'base64'), 'base64').toString('base64')
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// export course schema
module.exports = mongoose.model('Course', CourseSchema);