const userModel = require('../models/user-model');

const userRepository = require('../repositories/user-repository');

exports.add = (req,res) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword);
    userRepository.add(user);
    res.status(200).send();
};

exports.getAll = (req,res) => {
    userRepository.getAll((users) => {
        res.status(200).send(users);
    });
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
        userRepository.getById(user._id, (userResult) => {
            res.status(200).send(userResult);
        });
    });
};

exports.delete = (req,res) => {
    const id = req.path.toString().replace("/","");
    userRepository.delete(id, () => {
        res.status(200).send();
    });
};