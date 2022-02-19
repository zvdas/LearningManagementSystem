const userModel = require('../models/user-model');

const userRepository = require('../repositories/user-repository');

const authenticateLogin = require('./authenticator');

exports.getAddUserForm = (req,res,next) => {
    userRepository.getAll((users) => {
        res.render('home.pug',{ users: users });
    });
};

exports.addUser = (req,res,next) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword);
    userRepository.add(user);
    authenticateLogin;
};

exports.getEditUserView = (req,res,next) => {
    const id = CurrentUserDetails[0]._id.toString();
    userRepository.getById(id, (result) => {
        res.render('user_edit.pug',{ users: result });
    });
};

exports.editUser = (req,res,next) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword,req.body._id);
    userRepository.update(user,() => {
        const id = req.body._id;
        userRepository.getById(id, (result) => {
            res.render('user_edit.pug',{ users: result });
        });
    });
};

exports.deleteUser = (req,res,next) => {
    if(req.query.id===undefined) {
        userRepository.getAll((userList) => {
            res.render('user_delete.pug',{ userList:userList, users: CurrentUserDetails[0] });
        });
    }else{
        const id = req.query.id;
        userRepository.delete((id), () => {
            userRepository.getAll((userList) => {
                res.render('user_delete.pug',{ userList:userList,  users: CurrentUserDetails[0] });
            });
        });    
    }
};