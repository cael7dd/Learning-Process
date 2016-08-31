/**
 * Created by 87676 on 8/31/2016.
 */
"use strict";
var express = require('express');
var router = express.Router();
var fs=require("fs");
var mysql=require("mysql");
var multer=require("multer");
const uploadDirectory="uploadImg";
var upload=multer({dist:`public/${uploadDirectory}`});
/* GET users listing. */
router.post('/', upload.single("img"),(req,res,next)=>{
    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"images"
    });
    connection.connect((err,result)=>{
        if(!err){
            var file=req.file;
            var path=`${uploadDirectory}/${file.originalname}`;
            connection.query("INSERT INTO images SET ?",
                {imageName:file.originalname,imageDescription:req.body.description,imagePath:path},
                (err)=>{
                    if(!err){
                        fs.writeFile("public/"+path,file.buffer,()=>{
                            if(err){
                                console.log(err);
                            }
                        });
                        res.redirect("/");
                    }else{
                        res.json(err);
                    }
                    connection.end();
                })
        }else{
            res.json(err);
        }
    })
});

module.exports = router;
