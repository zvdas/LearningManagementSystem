const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/home', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','home.html'));
    res.render('home.pug',{});
});

router.get('/navbar', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','navbar.html'));
    res.render('navbar.pug',{});
});

router.get('/edit', (req,res)=>{
    // res.sendFile(path.join(__dirname,'../','views','user_edit.html'));
    res.render('user_edit.pug',{});
});

module.exports = router;