const userRepository = require('../repositories/user-repository');

const userModel = require('../models/user-model');

const path = require('path');

exports.add = (req,res) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword);
    userRepository.add(user);
    res.status(200).send();
};

exports.getById = (req,res) => {
    const id = req.path.toString().replace("/","");
    userRepository.getById(id, (user) => {
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send("Error");
        }
    });
};

exports.update = (req,res) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword,req.body._id);
    userRepository.update(user, () => {
        userRepository.getById(course._id, (userResult) => {
            res.status(200).send(userResult);
        });
    });
};