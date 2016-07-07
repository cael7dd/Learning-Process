/**
 * Created by 87676 on 7/7/2016.
 */
(function () {
    var xhr,form,result;
    function getElement() {
        form=document.querySelector("#form");
        result=document.querySelector("#result");
    }
    function addListeners() {
        form.onsubmit=function (event) {
            event.preventDefault();
            result.innerHTML="loading...";
            connectServer({userName:form["userName"].value,password:form["password"].value});
        }
    }
    function connectServer(data) {
        var str="";
        for(var i in data){
            str+=i+"="+data[i]+"&";
        }
        xhr.onload=function () {
            result.innerHTML=xhr.responseText;
        };
        xhr.open("post","/login");
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(str);
    }
    function init() {
        xhr=new XMLHttpRequest();
        getElement();
        addListeners();
    }
    init();
})();