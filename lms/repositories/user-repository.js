const { ObjectId } = require('mongodb');
const database = require('../configurations/mongodb-config');

exports.add = (user,callback) => {
    const collection = database.getCollection();
    collection.insertOne({ userName: user.userName, userType: user.userType, userEmail: user.userEmail, userPassword: user.userPassword })
}

exports.getAll = (callback) => {
    const collection = database.getCollection();
    collection.findOne()
        .then((users) => {
            return callback(users);
        });
}

exports.update = (user,callback) => {
    const collection = database.getCollection();
    collection.findOneAndUpdate({ _id: ObjectId(user._id) }, { $set: { userName: user.userName, userEmail: user.userEmail, userPassword: user.userPassword }}, {})
        .then(()=>{
            return callback();
        });
}