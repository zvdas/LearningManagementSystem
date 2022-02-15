const cli = require('nodemon/lib/cli');

const mongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://127.0.0.1:27017/userDB';

const client = new mongoClient(uri);

var collection;

module.exports = {
    
    connect: function(callback) {
        mongoClient.connect(uri)
            .then(function(client){
                collection = client.db('userDB').collection("Users");
                courseCollection = client.db('userDB').collection("Courses");
                return callback("OK");
            })
            .catch(function(err){
                console.log(err);
            })
    },

    getUserCollection: function(){
        return collection;
    },

    getCourseCollection: function(){
        return courseCollection;
    }
    
}