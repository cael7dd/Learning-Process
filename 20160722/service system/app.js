/**
 * Created by 87676 on 7/22/2016.
 */
var express=require("express");
var http=require("http");
var socketIO=require("socket.io");
var Connection=require("./Connection");
var fs=require("fs");

var app=express();
var Server=http.Server(app);
var io=socketIO(Server);

//app.use(express.static("static"));

Server.listen(8000,()=>{
    console.log("Server start at port 8000");
});
var httpServer=http.createServer((req,res)=> {
    switch(req.url){
        case "/admin":
            res.end(fs.readFileSync("static/admin/admin.html"));
            break;
        case "/adminMain.js":
            res.end(fs.readFileSync("static/admin/adminMain.js"));
            break;
        case "/adminStyle.css":
            res.end(fs.readFileSync("static/admin/adminStyle.css"));
            break;
        case "/user":
            res.end(fs.readFileSync("static/user/user.html"));
            break;
        case "/userMain.js":
            res.end(fs.readFileSync("static/user/userMain.js"));
            break;
        case "/userStyle.css":
            res.end(fs.readFileSync("static/user/userStyle.css"));
            break;
        case "/socket.io.js":
            res.end(fs.readFileSync("static/user/socket.io.js"));
            break;
        case "/staticStyle.css":
            res.end(fs.readFileSync("static/staticStyle.css"));
            break;
        case "/11.png":
            res.end(fs.readFileSync("img/11.png"));
            break;
        case "/1.png":
            res.end(fs.readFileSync("img/1.png"));
            break;
        case "/1.gif":
            res.end(fs.readFileSync("img/1.gif"));
            break;
        default: res.end("<h1>404 NOT FOUND</h1>");
    }
});
httpServer.listen(8888,()=>{
    console.log("httpServer start at port 8888");
});
io.on("connection",(socket)=>{
    new Connection(socket);
});