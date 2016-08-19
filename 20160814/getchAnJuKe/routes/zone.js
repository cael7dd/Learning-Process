/**
 * Created by 87676 on 8/12/2016.
 */
var express = require('express');
var router = express.Router();
var async = require("async");
var request = require("request");
var Village=require("../models/villageModel");
var VillagePrice=require("../models/villagePriceModel");
/* GET users listing. */
router.get('/', function (req, res, next) {
    getDistrictName();
    res.send('respond with a resource');
});
function getSingleVillagePrice(_id,id) {
    var url = "http://shanghai.anjuke.com/ajax/pricetrend/comm?cid=" + id;
    request(url, function (err, res, body) {
        if(body&&JSON.parse(body).comm){
            var data = JSON.parse(body).comm;
            data.forEach(function (price) {
                for(var t in price){
                    var dbPrice=new VillagePrice({
                        zone:_id,
                        time:t,
                        price:price[t]
                    });
                    dbPrice.save(function (err,pVillagePrice) {
                        console.log("price saved success!");
                    });
                }
            });
        }

    })
}
function getVillageData(obj) {
    var name=obj.pinyin;
    var page=obj.pageAmount;
    console.log(name);
    var zoneTitle = [];
    var path = "http://beijing.anjuke.com/community/" + name;
    var p = /<h3><ahref="\/community\/view\/([^\/]+)\/"_soj="Filter_1&amp;hfilter=filterlist"title="[^"]+"target="_blank">([^<]+)<\/a><\/h3><address>/g;
    request(path, function (err, res, body) {
        var i = 2;
        var q = async.queue(function (task, callback) {
            task.run(task.num);
            callback(null, null);
        }, 1);
        q.drain = function () {
            var delay = 30000;
            if (i <= page) {
                setTimeout(function () {
                    q.push({name: "t" + i, run: requestData, num: i});
                    i++;
                }, delay);
            }
        };
        function requestData(m) {
            var url = path + "/p" + m;
            request(url, function (err, res, body) {
                if(body){
                    while (true) {
                        var data = body.replace(/\s/g, "");
                        var temp = p.exec(data);
                        if (!temp) {
                            break;
                        }
                        var village=new Village({
                            villageId:temp[1],
                            name:temp[2],
                            address:obj.character
                        });
                        village.save(function (error,pVillage) {
                            console.log(pVillage.name+"saved success!");
                            getSingleVillagePrice(pVillage._id,pVillage.villageId);
                        });
                    }
                }
            });
        }
        q.push({name: "t1", run: requestData, num: 1});
    });
}
function getAllVillageData(district) {
    var i = 2;
    var delay=district[i-1].pageAmount*30000+5000;
    var q = async.queue(function (task, callback) {
        task.run(district[task.num]);
        callback(null, null);
    }, 1);
    q.push({name: "t1", run: getVillageData, num: 0});
    q.drain = function () {
        if (i <= district.length) {
            delay=district[i-1].pageAmount*30000+5000;
            setTimeout(function () {
                q.push({name: "t" + i, run: getVillageData, num: i - 1});
                i++;
            }, delay);
        }
    };

}
function getDistrictPage(district) {
    var q=async.queue(function (task,callback) {
        task.run(task.num);
        console.log("loading page...");
        callback(null,null);
    },1);
    var i=2;
    q.push({name:"t1",run:getPage,num:0});
    function getPage(m) {
        var path = "http://beijing.anjuke.com/community/" + district[m].pinyin;
        request(path, function (err, res, body) {
            var data = body.replace(/\s/g, "");
            district[m].pageAmount = Math.ceil(parseInt(/小区<em>([^<]+)<\/em>个<\/span>/.exec(data)[1]) / 30);
        });
    }
    q.drain=function () {
        if(i<=district.length){
            setTimeout(function () {
                q.push({name:"t"+i,run:getPage,num:i-1});
                i++;
            },1000);
        }else{
            getAllVillageData(district);
        }
    };

}
function getDistrictName() {
    var district = [];
    request("http://beijing.anjuke.com/community/", function (err, res, body) {
        var data = body.replace(/\s/g, "").match(/<spanclass="item-title">区域：<\/span><spanclass="elems-l">.+--区域end-->/);
        var p = /<ahref="http:\/\/beijing.anjuke.com\/community\/([^\/]+)\/"class="">([^<]+)<\/a>/g;
        while (true) {
            var temp = p.exec(data);
            if (!temp) {
                break;
            }
            district.push({pinyin: temp[1], character: temp[2]});
        }
        district.pop();
        console.log(district);
        getDistrictPage(district);
    });
}
module.exports = router;