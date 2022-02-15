const { ObjectId } = require('mongodb');

const database = require('../configurations/mongodb-config');

exports.add = (user,callback) => {
    const userCollection = database.getUserCollection();
    userCollection.insertOne({ userName: user.userName, userType: user.userType, userEmail: user.userEmail, userPassword: user.userPassword })
};

exports.getAll = (callback) => {
    const userCollection = database.getUserCollection();
    userCollection.find().toArray()
        .then((users) => {
            return callback(users);
        });
};

exports.getById = (id,callback) => {
    console.log(id);
    const userCollection = database.getUserCollection();
    userCollection.findOne({ _id: ObjectId(id) })
        .then((users) => {
            return callback(users);
        });
};

exports.update = (user,callback) => {
    const userCollection = database.getUserCollection();
    userCollection.findOneAndUpdate({ _id: ObjectId(user._id) }, { $set: { userName: user.userName, userEmail: user.userEmail, userPassword: user.userPassword }}, {})
        .then(()=>{
            return callback();
        });
};

exports.delete = (id,callback) => {
    const userCollection = database.getUserCollection();
    userCollection.deleteOne({ _id: ObjectId(id) })
        .then((result) => {
            return callback();
        });
};