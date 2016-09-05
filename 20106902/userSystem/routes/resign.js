/**
 * Created by 87676 on 9/1/2016.
 */
var express = require('express');
var router = express.Router();
var fs=require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.end(fs.readFileSync("./public/resign.html"));
});
module.exports = router;
