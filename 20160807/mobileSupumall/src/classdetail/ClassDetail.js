/**
 * Created by 87676 on 8/4/2016.
 */
(function () {
    function ClassDetail() {
        this.currentPageCode=0;
        this.hasMore=true;
        this.className=["衬衫","礼服","棉服","短外套","卫衣","T恤","风衣","打底裤","皮草","羊绒衫","牛仔裤","休闲裤","短裤"];
        this.parseURL();

    }
    ClassDetail.prototype.initHeight=function () {
        document.body.style.height=window.innerHeight+"px";
        var head=document.querySelector(".blockHead");
        head.innerHTML=this.className[parseInt(this.classID)-1];
    };
    ClassDetail.prototype.parseURL=function () {
        this.classID=/\?classID=(.+)#/.exec(window.location.href);
        if(!this.classID){
            document.body.innerHTML="<h1>404 NOT FOUND</h1>";
        }else{
            this.classID=this.classID[1];
            this.init();
        }
    };
    ClassDetail.prototype.init=function () {
        window.sessionStorage.setItem("lastPage",window.location.href);
        this.initHeight();
        this.clickMore();
        this.loadData();
    };
    ClassDetail.prototype.clickLoad=function () {
        if(this.hasMore){
            this.loading.style.display="block";
            this.showText.innerHTML="";
            this.loadData();
        }

    };
    ClassDetail.prototype.loadData=function () {
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/getGoods.php",data:{classID:self.classID,linenumber:4,pageCode:self.currentPageCode},dataType:"jsonp",success:function (data) {
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
        }});
    };
    ClassDetail.prototype.clickMore=function () {
        this.loading=document.querySelector("#loading");
        this.showText=document.querySelector("#text");
        this.more=document.querySelector("#d_goodsBlockBottom");
        this.more.addEventListener("touchstart",this.clickLoad.bind(this));
    };
    ClassDetail.prototype.createGoodBlock=function (data) {
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
    new ClassDetail();
})();