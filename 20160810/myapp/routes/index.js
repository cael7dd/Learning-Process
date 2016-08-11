var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'yoyooooooooooooooooooo!'});
});
router.get('/test', function (req, res, next) {
    var name = req.body.name;
    res.json({
        name: "hello" + name,
        state: 0
    });
});
module.exports = router;
