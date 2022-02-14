const userModel = require('../models/user-model');

const repository = require('../repositories/user-repository');

exports.getAddUserForm = (req,res,next) => {
    res.render('home.pug',{});
}

exports.getEditUserView = (req,res,next) => {
    repository.getOne((users) => {
        res.render('user_edit.pug',{ title: 'Users', users: users});
    });
}

exports.addUser = (req,res,next) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword);
    repository.add(user);
    repository.getOne((users) => {
        res.render('user_edit.pug',{ title: 'Users', users: users});
    });
}

exports.updateUser = (req,res,next) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword,req.body._id);
    repository.update(user,() => {
        repository.getOne((users) => {
            res.render('user_edit.pug',{ title: 'Users', users: users});
        });
    });
}