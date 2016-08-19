/**
 * Created by 87676 on 8/14/2016.
 */
var mongoose=require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema=new mongoose.Schema({
    zone:{type:ObjectId,ref:'Village'},
    time: Number,
    price: Number
});
module.exports=schema;