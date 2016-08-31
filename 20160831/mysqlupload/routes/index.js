"use strict";
var express = require('express');
var router = express.Router();
var mysql = require("mysql");
/* GET home page. */

router.get('/', function (req, res, next) {
    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"images"
    });
    connection.connect((err,result)=>{
        if(!err){
            connection.query("SELECT * FROM images",function (err,rows,fields) {
                if(!err){
                    res.render("index",{title:"font page",rows:rows})
                }else{
                    res.json(err);
                }
                connection.end();
            })
        }else{
            res.json(err);
        }
    });

});

module.exports = router;
