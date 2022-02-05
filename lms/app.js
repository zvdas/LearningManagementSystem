const express = require('express');

const userRoutes = require('./routes/user_routes');

const courseRoutes = require('./routes/course_routes');

const app = express();

app.use('/user',userRoutes);

app.use('/course',courseRoutes);

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});