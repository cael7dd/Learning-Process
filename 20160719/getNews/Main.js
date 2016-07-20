/**
 * Created by 87676 on 7/19/2016.
 */
const fs=require("fs");
class Main{
    constructor(){

    };
    init(){
        document.body.innerHTML="<label>想查点啥 <input type=\"text\" id='ipt_content'> </label>"+
            "<input type=\"radio\" id=\"ipt_news\" checked=\"checked\" name=\"choose\"><label for=\"ipt_news\">新闻</label>"+
        "<input type=\"radio\" id=\"ipt_web\" name=\"choose\" disabled='disabled'><label for=\"ipt_web\" >网页</label> <input type=\"button\" value=\"搜索\" id=\"ipt_search\">";
        this.iptSearch=document.querySelector("#ipt_search");
        this.iptContent=document.querySelector("#ipt_content");
        this.iptNews=document.querySelector("#ipt_news");
        var self=this;
        this.currentPageNum=0;
        this.iptSearch.onclick=function () {
            if(self.iptNews.checked==true){
                self.type="http://news.baidu.com/ns?word=";
            }else{
                self.type="https://www.baidu.com/s?wd=";
            }
            self.content=self.iptContent.value;
            self.loadPage();
        };
    }
    loadPage(){
        var self=this;

        var pHref=/<h3 class="c-title"><a href="(.+)"/g;
        var pTitle=/>(.*)<\/a><\/h3>/g;
        var link=[];
        var head=[];
        document.body.innerHTML="";
        var resource=self.type+self.content+"&pn="+this.currentPageNum+"0";
        console.log(resource);
        $.get(resource,function (data) {
            while (true){
                var href=pHref.exec(data);
                var title=pTitle.exec(data);
                if(href){

                    head.push(title[1]);
                    link.push(href[1]);
                }else{
                    break;
                }
            }
            for(var i=0;i<head.length;i++){

                var node=document.createElement("a");
                node.href=link[i];
                node.innerHTML=head[i];
                node.target="_blank";
                document.body.appendChild(node);
            }
            self.createButton();
        })
    }
    createButton(){
        var self=this;
        for(var i=0;i<10;i++){
            var node=document.createElement("input");
            if(i==self.currentPageNum){
                node.style.color="blue";
            }
            node.type="button";
            node.value=i+1;
            (function (m) {
                node.onclick=function () {
                    self.currentPageNum=m;
                    document.body.innerHTML="";
                    self.loadPage();
                };
            })(i);
            document.body.appendChild(node);
        }
        var back=document.createElement("button");
        back.innerHTML="回到首页";
        document.body.appendChild(back);
        back.onclick=function () {
            self.init();
        }
    }
}
var news=new Main();
news.init();