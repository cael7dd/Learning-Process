/**
 * Created by 87676 on 7/7/2016.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
var data=[{userName:"qqq",password:"123456"},
    {userName:"www",password:"123456"},
    {userName:"eee",password:"123456"},
    {userName:"rrr",password:"123456"},
    {userName:"ttt",password:"123456"}
];
function judgeLog(userName,password) {
    for(var i=0;i<data.length;i++){
        if(data[i].userName==userName){
            if(data[i].password==password){
                return "welcome back "+userName+"!";
            }
            else{
                return "wrong password!";
            }
        }
    }
    return "this user name does't exist!";
}
router.post('/', function(req, res, next) {
    res.send(judgeLog(req.body.userName,req.body.password));
});

module.exports = router;
