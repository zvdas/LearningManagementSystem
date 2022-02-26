const mongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://127.0.0.1:27017/LMSDB';

const client = new mongoClient(uri);

module.exports = {
    
    connect: function(callback) {
        mongoClient.connect(uri)
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