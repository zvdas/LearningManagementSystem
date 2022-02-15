const userModel = require('../models/user-model');

const userRepository = require('../repositories/user-repository');

const courseRepository = require('../repositories/course-repository');

exports.getAddUserForm = (req,res,next) => {
    userRepository.getAll((users) => {
        res.render('home.pug',{ title: '', users: users});
    });
};

exports.addUser = (req,res,next) => {
    if(Object.values(req.body).length===4) {
        userRepository.getAll((users) => {
            if(JSON.stringify(users).includes(req.body.userEmail)) {
                res.render('home.pug',{ title: 'The email id is already registered! Kindly login.' });
            }else{
                const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword);
                userRepository.add(user);
                userRepository.getAll((users) => {
                    res.render('home.pug',{ title: '', users: users });
                });
            }
        });
    }else if(Object.values(req.body).length===2){
        userRepository.getAll((users) => {
            if(Object.values(users)[users.findIndex(std => std.userEmail === req.body.loginEmail)].userPassword === req.body.loginPassword) {
                const id = Object.values(users)[users.findIndex(std => std.userEmail === req.body.loginEmail)]._id.toString();
                userRepository.getById(id, (result) => {
                    // courseRepository.getAll((courses) => {
                    res.render('user_edit.pug',{ users: result });
                        // , courses: courses
                    // });
                });
            }else{
                res.render('home.pug',{ name: 'The login details provided are incorrect. Please register or try again.' });
            }
        });
    }
};

exports.getEditUserView = (req,res,next) => {
    userRepository.getById((users) => {
        res.render('user_edit.pug',{ title: 'Users', users: users});
    });
};

exports.editUser = (req,res,next) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword,req.body._id);
    userRepository.update(user,() => {
        userRepository.getOne((users) => {
            res.render('user_edit.pug',{ title: 'Users', users: users});
        });
    });
};

exports.deleteUser = (req,res,next) => {
    if(req.query.id===undefined) {
        userRepository.getAll((users) => {
            res.render('user_delete.pug',{ users:users });
        });
    }else{
        const id = req.query.id;
        userRepository.delete((id), () => {
            userRepository.getAll((users) => {
                res.render('user_delete.pug',{ users:users });
            });
        });    
    }
};