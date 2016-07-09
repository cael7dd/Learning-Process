var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.cb){
    res.send(req.query.cb+"('1.mp4');");
  }
  else{
    res.send("error");
  }
});
module.exports = router;
