/**
 * Created by 87676 on 7/4/2016.
 */
var http=require("http");
var fs=require("fs");
http.createServer(function (request,response) {
    if(request.url=="/index.html"){
        response.end(fs.readFileSync("index.html"));
    }else if(request.url.match(/calculator/)){
        var str=request.url;
        var result={};
        var p=/[?|&]([^=]+)=([^&]+)/g;
        while (true){
            var res=p.exec(str);
            if(res){
                result[res[1]]=parseFloat(res[2]);
            }
            else {
                break;
            }
        }
        var sum=0;
        for(var i in result){
            sum+=result[i];
        }
        console.log(sum);
        response.end(""+sum);
    }else{
        response.end("<h1>404 not found</h1>");
    }
}).listen(8000);