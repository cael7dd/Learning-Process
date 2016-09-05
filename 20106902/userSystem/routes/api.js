/**
 * Created by 87676 on 9/2/2016.
 */
var express = require('express');
var router = express.Router();
var md5=require("md5-js");
var orm=require("orm");

router.post("/resign",function (req,res,next) {
    req.models.user.find({logName:req.body.logName},function (err,users) {
        if(!err){
            if(!users[0]){
                var obj=req.body;
                obj.level=1;
                obj.password=md5(obj.password,32);
                req.models.user.create(obj,function (err) {
                    if(!err){
                        req.session.currentUser=obj.logName;
                        res.json({state:0,massage:"注册成功！"});
                    }else{
                        res.json({state:6,msg:"用户创建失败"});
                    }
                })
            }else{
                res.json({state:5,msg:"用户名已存在！"});
            }
        }else{
            res.json({state:6,msg:"用户创建失败"});
        }
    });
});
router.post("/login",(req,res,next)=> {
    var obj=req.body;
    req.models.user.find({logName:obj.logName},function (err,users) {
        if(!err){
            var user=users[0];
            if(user){
                if(user.password==md5(obj.password,32)){
                    req.session.currentUser=obj.logName;
                    res.json({state:0,msg:"登录成功!"});
                }else{
                    res.json({state:2,msg:"用户存在，但密码不正确！"});
                }
            }else{
                res.json({state:1,msg:"用户不存在！"});
            }
        }else{
            res.json({state:7,msg:"用户登录失败！"});
        }
    })
});
router.post("/quit",function (req,res,next) {
    req.session.currentUser="";
    res.end();
});
router.post("/personal",(req,res,next)=>{
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.find({logName:currentUser},function (err,users) {
            if(!err){
                var user=users[0];
                switch (user.level){
                    case 1:res.json({state:0,msg:"验证成功",level:1,data:user});break;
                    default:
                        req.models.user.find({level:orm.lt(user.level)},function (err,users) {
                            if(!err){
                                res.json({state:0,msg:"验证成功",level:user.level,data:user,memberData:users});
                            }else{
                                res.json({state:11,meg:"成员信息获取失败！",level:user.level,data:user});
                            }
                        });break;
                }
            }else{
                res.json({state:4,meg:"尚未登录，请重新登录！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});
router.post("/changePassword",function (req,res,next) {
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.find({logName:currentUser},function (err,users) {
            if(!err){
                var user=users[0];
                user.save({password:md5(req.body.password)},function (err) {
                    if(!err){
                        res.json({state:0,msg:"密码更改成功！"});
                    }else{
                        res.json({state:9,msg:"密码更改失败！"});
                    }
                });
                
            }else{
                res.json({state:4,meg:"尚未登录，请重新登录！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});
router.post("/changeNiceName",function (req,res,next) {
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.find({logName:currentUser},function (err,users) {
            if(!err){
                var user=users[0];
                user.save(req.body,function (err) {
                    if(!err){
                        res.json({state:0,msg:"昵称更改成功！"});
                    }else{
                        res.json({state:10,msg:"昵称更改失败！"});
                    }
                });

            }else{
                res.json({state:4,meg:"尚未登录，请重新登录！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});
router.post("/changeInfo",function (req,res,next) {
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.find({logName:currentUser},function (err,users) {
            if(!err){
                var user=users[0];
                user.save(req.body,function (err) {
                    if(!err){
                        res.json({state:0,msg:"信息更改成功！"});
                    }else{
                        res.json({state:10,msg:"信息更改失败！"});
                    }
                });

            }else{
                res.json({state:4,meg:"尚未登录，请重新登录！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});

router.post("/setAdmin",function (req,res,next) {
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.get(req.body.id,function (err,user) {
            if(!err){
                user.save({level:2},function (err) {
                    if(!err){
                        res.json({state:0,meg:"升级成功！"});
                    }else{
                        res.json({state:12,meg:"升级管理员失败！"});
                    }
                })
            }else{
                res.json({state:1,meg:"用户不存在！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});
router.post("/cancelAdmin",function (req,res,next) {
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.get(req.body.id,function (err,user) {
            if(!err){
                user.save({level:1},function (err) {
                    if(!err){
                        res.json({state:0,meg:"取消成功！"});
                    }else{
                        res.json({state:13,meg:"取消管理员失败！"});
                    }
                })
            }else{
                res.json({state:1,meg:"用户不存在！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});
router.post("/removeMember",function (req,res,next) {
    var currentUser=req.session.currentUser;
    if(currentUser){
        req.models.user.get(req.body.id,function (err,user) {
            if(!err){
                user.remove(function (err) {
                    if(!err){
                        res.json({state:0,meg:"移除成功！"});
                    }else{
                        res.json({state:14,meg:"移除用户失败！"});
                    }
                })
            }else{
                res.json({state:1,meg:"用户不存在！"});
            }
        });
    }else{
        res.json({state:4,meg:"尚未登录，请重新登录！"});
    }
});
module.exports = router;
