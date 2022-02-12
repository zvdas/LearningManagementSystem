const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/new', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','course_new.html'));
});

router.get('/dashboard', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','dashboard.html'));
});

router.get('/update', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','course_update.html'));
});

router.get('/delete', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','course_delete.html'));
});

module.exports = router;