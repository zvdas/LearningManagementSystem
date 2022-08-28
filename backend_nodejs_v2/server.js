// import necessary modules
const express = require('express');
const dotenv = require('dotenv');
// const multer = require('multer');

// load environment variables
dotenv.config({ path: './config/config.env' });

// config files
const connectDB = require('./config/mongodb.config');

// route files
const users = require('./routes/users.route');
const courses = require('./routes/courses.route');

// define express app
const app = express();

// use body parser
app.use(express.json());

// connect database
connectDB();

// use multer
// app.use(multer());

// mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/courses', courses);

//define port
const PORT = process.env.PORT || 5000;

// start express app
app.listen(
    PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
});