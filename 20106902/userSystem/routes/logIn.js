/**
 * Created by 87676 on 9/1/2016.
 */
"use strict";
var express = require('express');
var router = express.Router();
var fs=require("fs");
var md5=require("md5-js");
var passKey=require("./passKey");

/* GET home page. */
router.get('/', (req, res, next)=> {
    res.end(fs.readFileSync("./public/logIn.html"));
});


module.exports = router;
