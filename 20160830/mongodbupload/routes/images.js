var express = require('express');
var router = express.Router();
var multer=require("multer");
var upload=multer();
var fs=require("fs");
var Images=require("../model/imagesModel");

var lastData;
/* GET home page. */
router.get('/', function(req, res, next) {
    getAllData().then(function (data) {
        console.log(data.length);
        res.render('images',{ title: 'Images',arr:data})
    });
});
router.get("/path",function (req,res,next) {
    var path="../"+req.query.path.replace(/public/,"");
    res.render('img',{ title: 'img',path:path})
});
router.post("/", upload.single("img"),function (req,res,next) {
    var data=req.file;
    if(lastData==data.originalname){
        getAllData().then(function (data) {
            res.render('images',{ title: 'Images',arr:data});
        });
    }else{
        lastData=data.originalname;
        var path="public/images/"+data.originalname;
        fs.writeFile(path,data.buffer,function (err) {
            if(!err){
                var img=new Images({
                    imageName:data.originalname,
                    imagePath:path,
                    imageSize:data.size
                });
                img.save(function (error,data) {
                    getAllData().then(function (data) {
                        res.render('images',{ title: 'Images',arr:data})
                    });
                });
            }
        })
    }
});
function getAllData() {
    return new Promise(function (resolve,reject) {
        Images.find()
            .exec(function (err,data) {
                resolve(data);
            })
    });

}

module.exports = router;
