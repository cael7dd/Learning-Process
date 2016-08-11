var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index');
});
var users = [{id:1,name:"王一",age:11},
    {id:2,name:"王二",age:13},
    {id:3,name:"王三",age:3},
    {id:4,name:"王四",age:6},
    {id:5,name:"王五",age:21},
    {id:6,name:"王六",age:100000}]; //name age gender

router.get("/user", function (req, res, next) {
    res.json({
        users: users,
        state: 0
    });
});

router.post("/post", function (req, res, next) {
    var user={id:users.length+1,name:req.body.name,age:req.body.age};
    users.push(user);
    res.end("1");
});

router.put("/user", function (req, res, next) {
   var id=req.body.id;
    for(var i=0;i<users.length;i++){
        if(users[i].id==id){
            break;
        }
    }
    if(i!=users.length){
        users[i].name=req.body.name;
        users[i].age=req.body.age;
        res.end("1");
    }else {
        res.end("0");
    }



});

router.delete("/user", function (req, res, next) {
    var id=req.body.id;
    for(var i=0;i<users.length;i++){
        if(id==users[i].id){
            break;
        }
    }
    if(i!=users.length){
        users.splice(i,1);
        res.end("1");
    }else{
        res.end("0");
    }
});


module.exports = router;
