const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/new', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','static','course_new.html'));
    res.render('course_new.pug',{});
});

router.get('/dashboard', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','static','dashboard.html'));
    res.render('dashboard.pug',{});
});

router.get('/update', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','static','course_update.html'));
    res.render('course_update.pug',{});
});

router.get('/delete', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','static','course_delete.html'));
    res.render('course_delete.pug',{});
});

module.exports = router;