/**
 * Created by 87676 on 8/14/2016.
 */
/**
 * Created by 87676 on 8/14/2016.
 */
var mongoose=require("mongoose");
var schema=require("../schema/villagePriceSchema");

var VillagePrice=mongoose.model("VillagePrice",schema);
module.exports=VillagePrice;