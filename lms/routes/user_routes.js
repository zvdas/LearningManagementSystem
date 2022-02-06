const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','home.html'));
});

router.get('/navbar', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','navbar.html'));
});

router.get('/edit', (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','user_edit.html'));
});

module.exports = router;