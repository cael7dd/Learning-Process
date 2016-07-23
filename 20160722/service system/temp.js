/**
 * Created by 87676 on 7/23/2016.
 */
var str="$-94#$0#";
var p=/([^\$]*)\$([^\#]+)\#\$([^\#]+)\#/g;
while (true){
    var temp=p.exec(str);
    console.log(temp);
    if(!temp){
        break;
    }
}