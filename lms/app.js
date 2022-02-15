const express = require('express');

const userRoutes = require('./routes/user_routes');

const courseRoutes = require('./routes/course_routes');

const bodyParser = require('body-parser');

const mongodbConfig = require('./configurations/mongodb-config');

const app = express();

app.set('view engine','pug');

app.set('views','views/dynamic');

mongodbConfig.connect(() => {
    console.log("Connected to MongoDB in Express");
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// app.use('/user',userRoutes);

// app.use('/course',courseRoutes);

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});