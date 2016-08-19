/**
 * Created by 87676 on 8/14/2016.
 */
var mongoose=require("mongoose");
var schema=require("../schema/villageSchema");

var Village=mongoose.model("Village",schema);
module.exports=Village;