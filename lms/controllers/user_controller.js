const userModel = require('../models/user-model');

const userRepository = require('../repositories/user-repository');

const courseRepository = require('../repositories/course-repository');

// const CurrentUserDetails=[];

exports.getAddUserForm = (req,res) => {
    userRepository.getAll((users) => {
        res.render('home.pug',{ users: users });
    });
};

exports.addUser = (req,res) => {
    if(Object.values(req.body).length===4) {
        userRepository.getAll((users) => {
            if(JSON.stringify(users).includes(req.body.userEmail)) {
                res.render('home.pug',{ title: 'The email id is already registered! Kindly login.' });
            }else{
                const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword);
                userRepository.add(user);
                userRepository.getAll((users) => {
                    res.render('home.pug',{ title: 'Registration successful! Kindly login to proceed.', users: users });
                });
            }
        });
    }else if(Object.values(req.body).length===2){
        userRepository.getAll((users) => {
            if(Object.values(users)[users.findIndex(std => std.userEmail === req.body.loginEmail)].userPassword === req.body.loginPassword) {
                const id = Object.values(users)[users.findIndex(std => std.userEmail === req.body.loginEmail)]._id.toString();
                userRepository.getById(id, (result) => {
                    global.CurrentUsername = result.userName;
                    global.CurrentUserId = result._id;
                    /*
                    CurrentUserDetails.push(result);
                    global.CurrentUserDetails = CurrentUserDetails;
                    */
                    courseRepository.getAll((courses) => {
                        res.render('dashboard.pug',{ username: CurrentUsername/*result.userName*/, courses: courses });
                    });
                });
            }else{
                res.render('home.pug',{ name: 'The login details provided are incorrect. Please register or try again.' });
            }
        });
    }
};

exports.getEditUserView = (req,res) => {
    // const id = CurrentUserDetails[0]._id.toString();
    const id = CurrentUserId.toString();
    userRepository.getById(id, (result) => {
        res.render('user_edit.pug',{ users: result, username: CurrentUsername });
    });
};

exports.editUser = (req,res) => {
    const user = new userModel(req.body.userName,req.body.userType,req.body.userEmail,req.body.userPassword,req.body._id);
    userRepository.update(user,() => {
        const id = req.body._id;
        userRepository.getById(id, (result) => {
            res.render('user_edit.pug',{ users: result });
        });
    });
};

exports.deleteUser = (req,res) => {
    if(req.query.id===undefined) {
        userRepository.getAll((userList) => {
            res.render('user_delete.pug',{ userList:userList, username: CurrentUsername/*CurrentUserDetails[0]*/ });
        });
    }else{
        const id = req.query.id;
        userRepository.delete((id), () => {
            userRepository.getAll((userList) => {
                res.render('user_delete.pug',{ userList:userList,  users: CurrentUsername/*CurrentUserDetails[0]*/ });
            });
        });    
    }
};