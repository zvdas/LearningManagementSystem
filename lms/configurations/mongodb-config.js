const mongoClient = require('mongodb').MongoClient;

const dotenv = require("dotenv");

dotenv.config({ path: '.env' });

// const uri = 'mongodb://127.0.0.1:27017/LMSDB';

const client = new mongoClient(process.env.MONGODB_URI);

module.exports = {
    
    connect: function(callback) {
        mongoClient.connect(process.env.MONGODB_URI)
            .then(function(client){
                userCollection = client.db('LMSDB').collection("Users");
                courseCollection = client.db('LMSDB').collection("Courses");
                return callback("OK");
            })
            .catch(function(err){
                console.log(err);
            })
    },
    getUserCollection: function(){
        return userCollection;
    },
    getCourseCollection: function(){
        return courseCollection;
    }

}