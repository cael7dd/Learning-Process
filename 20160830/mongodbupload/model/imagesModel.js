/**
 * Created by 87676 on 8/30/2016.
 */
var mongoose=require("mongoose");
var schema=require("../schema/imagesSchema");

var Images=mongoose.model("Image",schema);
module.exports=Images;