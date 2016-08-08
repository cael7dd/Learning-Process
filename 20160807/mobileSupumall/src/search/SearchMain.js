/**
 * Created by 87676 on 8/7/2016.
 */
(function () {
    function SearchMain() {
        this.parseURL();
    }
    SearchMain.prototype.parseURL=function () {
        var temp=/\?selectText=(.+)#/.exec(window.location.href);
        if(temp){
            this.selectText=decodeURI(temp[1]);
            this.init();
        }else {
            document.body.innerHTML="<h1>404 NOT FOUND</h1>"
        }
    };
    SearchMain.prototype.init=function () {
        this.currentPageCode=0;
        window.sessionStorage.setItem("lastPage",window.location.href);
        this.hasMore=true;
        this.addSearchBtnFunc();
        this.initHeight();
        this.loadData();
        this.clickMore();
    };
    SearchMain.prototype.addSearchBtnFunc=function () {
        var input=document.querySelector("#search");
        var button=document.querySelector("#btnSearch");
        button.addEventListener("touchstart",function () {
            if(input.value){
                window.location.href="../search/index.html?selectText="+input.value+"#";
            }
        });
    };
    SearchMain.prototype.loadData=function () {
        var iptSearch=document.querySelector("#search");
        iptSearch.value=this.selectText;
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",data:{selectText:this.selectText,pageCode:this.currentPageCode},
        dataType:"jsonp",success:function (data) {
                if(data!="0"){
                    self.createGoodBlock.call(self,data);
                    self.currentPageCode++;
                    self.showText.innerHTML="查看更多";
                }else{
                    self.hasMore=false;
                    self.more.removeEventListener("touchstart",self.clickLoad.bind(this));
                    self.showText.innerHTML="没有更多了";
                }
                self.loading.style.display="none";
            }})
    };
    SearchMain.prototype.clickLoad=function () {
        if(this.hasMore){
            this.loading.style.display="block";
            this.showText.innerHTML="";
            this.loadData();
        }

    };
    SearchMain.prototype.clickMore=function () {
        this.loading=document.querySelector("#loading");
        this.showText=document.querySelector("#text");
        this.more=document.querySelector("#d_goodsBlockBottom");
        this.more.addEventListener("touchstart",this.clickLoad.bind(this));
    };
    SearchMain.prototype.createGoodBlock=function (data) {
        var container=document.querySelector("#goodListBlockContainer");
        var str;
        var originPrice;
        for(var i=0;i<data.length;i++) {
            if (data[i].discount == "0") {
                str = "";
                originPrice="";
            } else {
                str = data[i].discount + "折";
                originPrice="￥"+(parseInt(data[i][4])/parseInt(data[i].discount)).toFixed(2);
            }
            container.innerHTML+="<a href=\"../goodsdetails/index.html?goodsID="+data[i].goodsID+"#\" class=\"goodListBlock\"> <img src=\""+data[i][3]+"\" class=\"img_goodsBlock\" width=\"100%\">"+
                "<span class=\"headGoodsBlock\">"+data[i][2]+"</span> <div class=\"d_goodsText\"> <span class=\"s_goodsBlockPrice\">￥"+data[i][4]+"&nbsp;&nbsp;&nbsp;</span>"+
                "<span class=\"s_goodsBlockPrice\">"+str+"</span> <span class=\"s_goodsBlockAmount\">"+originPrice+"</span> </div> </a>";
        }
    };
    SearchMain.prototype.initHeight=function () {
       document.body.style.height=window.innerHeight+"px";
    };
    new SearchMain();
})();
