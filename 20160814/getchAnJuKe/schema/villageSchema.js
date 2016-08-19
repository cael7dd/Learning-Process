/**
 * Created by 87676 on 8/14/2016.
 */
var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    villageId:String,
    name:String,
    address:String
});
module.exports=schema;