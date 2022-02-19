const userRepository = require('../repositories/user-repository');

const courseRepository = require('../repositories/course-repository');

const userController = require('./user_controller');

const CurrentUserDetails=[];

exports.authenticateLogin = (req,res,next) => {
    if(Object.values(req.body).length===4) {
        userRepository.getAll((users) => {
            if(JSON.stringify(users).includes(req.body.userEmail)) {
                res.render('home.pug',{ title: 'The email id is already registered! Kindly login.' });
            }else{
                userController.addUser(req);
                userRepository.getAll((users) => {
                    res.render('home.pug',{ users: users });
                });
            }
        });
    }else if(Object.values(req.body).length===2){
        userRepository.getAll((users) => {
            if(Object.values(users)[users.findIndex(std => std.userEmail === req.body.loginEmail)].userPassword === req.body.loginPassword) {
                const id = Object.values(users)[users.findIndex(std => std.userEmail === req.body.loginEmail)]._id.toString();
                userRepository.getById(id, (result) => {
                    CurrentUserDetails.push(result);
                    global.CurrentUserDetails = CurrentUserDetails;
                    courseRepository.getAll((courses) => {
                        res.render('dashboard.pug',{ users: result, courses: courses });
                    });
                });
            }else{
                res.render('home.pug',{ name: 'The login details provided are incorrect. Please register or try again.' });
            }
        });
    }
};