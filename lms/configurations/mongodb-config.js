const mongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://127.0.0.1:27017/userDB';

const client = new mongoClient(uri);

module.exports = {
    
    connect: function(callback) {
        mongoClient.connect(uri)
            .then(function(client){
                userCollection = client.db('userDB').collection("Users");
                courseCollection = client.db('userDB').collection("Courses");
                imageCollection = client.db('userDB').collection("Images");
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
    },

    getImageCollection: function(){
        return imageCollection;
    }
    
}