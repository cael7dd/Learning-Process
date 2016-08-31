/**
 * Created by 87676 on 8/30/2016.
 */
var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    imageName:String,
    imagePath:String,
    imageSize:Number
});
module.exports=schema;