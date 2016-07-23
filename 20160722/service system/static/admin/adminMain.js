/**
 * Created by 87676 on 7/22/2016.
 */
(function () {
    var input,output,btnSend,btnClear,socket,tips;
    var clientsOutput={},clientMsgAmount={},currentId=0,firstClient=true;
    init();
    function init() {
        getElement();
        addExpression();
        expressionEvent();
        connectServer();
        socket.emit("admin");
        addListeners();

    }
    //动态添加表情
    function addExpression() {
        var container=document.querySelector("#d_expressionContainer");
        for(var i=0;i<10;i++){
            for(var j=0;j<9;j++){
                var div=document.createElement("div");
                div.className="d_express";
                div.style.backgroundPosition=-j*28+"px "+(-28)*i+"px";
                (function (m,n) {
                    div.onclick=function (event) {
                        event.stopPropagation();
                        input.value+="$"+(-n*28)+"#$"+(-28)*m+"#";
                    }
                })(i,j);
                container.appendChild(div);
            }
        }
    }
    //添加点击表情的事件
    function expressionEvent() {
        var btnExpression=document.querySelector("#d_openExpression");
        var expressionContainer=document.querySelector("#d_expressionContainer");
        btnExpression.onclick=function () {
            expressionContainer.style.display="block";
            document.addEventListener("mouseup",function () {
                expressionContainer.style.display="none";
                document.removeEventListener("mouseup",arguments.callee);
            });
        }
    }
    //获取结点
    function getElement() {
        input=document.querySelector("#input");
        output=document.querySelector("#output");
        btnSend=document.querySelector("#btn_send");
        btnClear=document.querySelector("#btn_clear");
        tips=document.querySelector("#d_tips");
    }
    //提取出发送过来的的消息中的表情代码和其他文字，并对表情代码进行处理
    function getExpression(data) {
        var exp=/([^\$]*)\$([^\#]+)\#\$([^\#]+)\#([^\$]*)/g;
        var first=true;
        var str="";
        while (true){
            var temp=exp.exec(data);
            if(!temp){
                if(first){
                    return data;
                }
                break;
            }
            first=false;
            if(temp[2]&&temp[3]){
                str+=temp[1]+"<div class='d_lineExpress' style='background-position:"+temp[2]+"px "+temp[3]+"px'></div>"+temp[4];
            }else{
                str+=temp[1]+temp[4];
            }
        }
        return str;
    }
    function addListeners(){
        btnClear.onclick=function () {
            input.value="";
        };
        //发送chat数据，并在自己的output中显示
        function sendChart() {
            socket.emit("chat","?id:"+currentId+"&"+input.value);
            var div=document.createElement("div");
            div.className="myLines";
            div.innerHTML="me&nbsp;:&nbsp;&nbsp;"+getExpression(input.value);
            clientsOutput[currentId].appendChild(div);
            output.innerHTML=clientsOutput[currentId].innerHTML;
            input.value=""; 
            output.scrollTop=output.scrollHeight;
        }
        //监听chat事件，并显示到output中，将用户发送的消息暂存在clientOutput对象中，并将当前正在聊天的用户的消息显示到output中
        socket.on("chat",function (data) {
            var temp=/\?id:([^\&]+)&(.*)/.exec(data);
            var clientId=temp[1];
            var div=document.createElement("div");
            div.className="lines";
            div.innerHTML="client&nbsp;:&nbsp;&nbsp;"+getExpression(temp[2]);
            clientsOutput[clientId].appendChild(div);
            output.innerHTML=clientsOutput[currentId].innerHTML;
            output.scrollTop=output.scrollHeight;
            if(clientId!=currentId){
                clientMsgAmount[clientId]++;
                changeLeftBoxNumber(clientId);
            }
        });
        //监听用户连接事件，显示tips，创建左侧用户列表信息
        socket.on("client",function (data) {
            tips.innerHTML="client&nbsp;&nbsp;"+data+"&nbsp;&nbsp;is&nbsp;&nbsp;looking&nbsp;&nbsp;for&nbsp;&nbsp;help!";
            if(firstClient){
                currentId=data;
            }
            clientMsgAmount[data]=0;
            clientsOutput[data]=document.createElement("div");
            createLeftBlock(data);
            btnSend.onclick=sendChart;
            document.onkeydown=function (event) {
                if(event&&event.keyCode==13){
                    event.preventDefault();
                    sendChart();
                }
            };
        });
        //监听用户离开事件，显示tips，并清除用于暂存消息的div
        socket.on("leave",function (data) {
            tips.innerHTML="client&nbsp;&nbsp;"+data+"&nbsp;&nbsp;has&nbsp;&nbsp;left!";
            delete clientsOutput[data];
            clearLeftBlock(data);
        });
        //监听没有用户事件，显示tips
        socket.on("none",function () {
            tips.innerHTML="no&nbsp;&nbsp;clients&nbsp;!&nbsp;&nbsp;enjoy&nbsp;&nbsp;yourself&nbsp;!";
            btnSend.onclick="";
            document.onkeydown="";
        });
    }
    //创建左侧用户列表，并显示正在服务的用户
    function createLeftBlock(data) {
        var container=document.querySelector("#d_leftList");
        var div=document.createElement("div");
        div.className="d_leftBlock";
        div.innerHTML="client "+data;
        var divNum=document.createElement("div");
        divNum.className="msgNumber";
        divNum._id=data;
        changeLeftBoxNumber(data);
        div.appendChild(divNum);
        div.boxId=data;
        if(firstClient){
            div.style.background="#bbbbbb";
            firstClient=false;
        }
        div.onclick=function () {
            if(currentId==this.boxId){
                return;
            }
            clientMsgAmount[this.boxId]=0;
            changeLeftBoxNumber(this.boxId);
            output.innerHTML=clientsOutput[this.boxId].innerHTML;
            currentId=this.boxId;
            var temps=document.querySelectorAll(".d_leftBlock");
            for(var i=0;i<temps.length;i++){
                temps[i].style.background="#fff";
            }
            this.style.background="#bbbbbb";
        };
        container.appendChild(div);
    }
    //用户离开后清除该用户的左侧信息
    function clearLeftBlock(data) {
        var blocks=document.querySelectorAll(".d_leftBlock");
        for(var i=0;i<blocks.length;i++){
            if(parseInt(/client\s(.+)/.exec(blocks[i].innerHTML)[1])==data){
                blocks[i].parentNode.removeChild(blocks[i]);
            }
        }
        if(blocks.length==1){
            firstClient=true;
        }
    }
    function changeLeftBoxNumber(id) {
        var divNum=document.querySelectorAll(".msgNumber");
        for(var i=0;i<divNum.length;i++) {
            if (divNum[i]._id == id) {
                divNum[i].innerHTML=clientMsgAmount[id];
                (clientMsgAmount[id]==0)?divNum[i].style.opacity=0:divNum[i].style.opacity=1;
                divNum[i].style.animation="changeRight .1s alternate 2";
                (function (m) {
                    setTimeout(function () {
                        divNum[m].style.animation="";
                    },200);
                })(i);

                return;
            }
        }
    }
    //连接服务器
    function connectServer() {
        var url=/(.+:)/.exec(location.origin)[1]+"8000";
        socket=io(url);
    }
})();