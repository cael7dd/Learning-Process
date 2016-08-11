/**
 * Created by 87676 on 8/10/2016.
 */
var app=require("../app");
var request = require("supertest")(app);
var should = require("should");


describe('测试用户', function () {
    it("post name", function (done) {
        request.post('/test').
        expect(200,function (err, res) {
            console.log('res', res.body.state);
            res.body.state.should.containEql(0);
            done();
        })
    })
});