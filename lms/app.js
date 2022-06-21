const express = require('express');

const cors = require("cors");

const userRoutes = require('./routes/user_routes');

const courseRoutes = require('./routes/course_routes');

const userRoutesAPI = require('./routes/user_routes_api');

const courseRoutesAPI = require('./routes/course_routes_api');

const bodyParser = require('body-parser');

const mongodbConfig = require('./configurations/mongodb-config');

const app = express();

app.set('view engine','pug');

app.set('views','views/dynamic');

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(cors({ origin: 'https://lmsnodejsapp.herokuapp.com' }));

mongodbConfig.connect(() => {
    console.log("Connected to MongoDB in Express");
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.use('/user',userRoutes);

app.use('/course',courseRoutes);

app.use('/api/user', userRoutesAPI);

app.use('/api/course', courseRoutesAPI);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is listening on port 3000");
});