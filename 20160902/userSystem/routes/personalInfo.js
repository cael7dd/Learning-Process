/**
 * Created by 87676 on 9/1/2016.
 */
var express = require('express');
var router = express.Router();
var fs=require("fs");
var orm=require("orm");

/* GET home page. */
router.get('/user', function(req, res, next) {
    res.end(fs.readFileSync("./public/personal.html"));
});


module.exports = router;
