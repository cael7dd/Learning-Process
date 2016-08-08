/**
 * Created by 87676 on 8/4/2016.
 */
(function () {
    function HomePageMain() {

        this.currentPageCode=0;
        this.hasMore=true;
        this.clickMore();
        this.changeHeight();
        this.getData();
        this.loadHotData();
        this.loadData();
        window.sessionStorage.setItem("lastPage",window.location.href);

    }
    HomePageMain.prototype.changeHeight=function () {
        document.body.style.height=window.innerHeight+"px";
    };
    HomePageMain.prototype.clickMore=function () {
        this.loading=document.querySelector("#loading");
        this.showText=document.querySelector("#text");
        this.more=document.querySelector("#d_goodsBlockBottom");
        this.more.addEventListener("touchstart",this.clickLoad.bind(this));
    };
    HomePageMain.prototype.clickLoad=function () {
        if(this.hasMore){
            this.loading.style.display="block";
            this.showText.innerHTML="";
            this.loadData();
        }

    };
    HomePageMain.prototype.getData=function () {
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/getBanner.php",method:"post",dataType:"jsonp",success:function (data) {
            self.createBanner.call(self,data);
        }});
    };
    HomePageMain.prototype.createBanner=function (data) {
        var banner=$("#banner");
        for(var i=0;i<data.length;i++){
           var str=JSON.parse(data[i][3])[0];
            banner[0].innerHTML+="<a href=\"../goodsdetails/index.html?goodsID="+data[i].goodsID+"#\" style=\"display: block; background:url('"+str+"') no-repeat 50% 50%; background-size: 100% 100%;height: 100%\"  class=\"swiper-slide\"></a>";
        }
        this.initBanner();
    };
    HomePageMain.prototype.loadHotData=function () {
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/getGoods.php",method:"post",dataType:"jsonp",success:function (data) {
            self.createList.call(self,data);
        }})
    };
    HomePageMain.prototype.loadData=function () {
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/getGoods.php",method:"post",data:{pageCode:self.currentPageCode,linenumber:4},dataType:"jsonp",success:function (data) {
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
    HomePageMain.prototype.createGoodBlock=function (data) {
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
    HomePageMain.prototype.createList=function (data) {
        var container=document.querySelector("#blockContainer");
        var str;
        for(var i=0;i<data.length;i++){
            if(data[i].discount=="0"){
                str="";
            }else{
                str=data[i].discount+"折";
            }
            container.innerHTML+= "<a href=\"../goodsdetails/index.html?goodsID="+data[i].goodsID+"#\" class=\"a_listBLock\"> <img src=\""+data[i][3]+"\" class=\"img_listBlock\"> <span class=\"s_listBlockPrice\">￥"+data[i].price+"</span>"+
                "<span class=\"s_listBlockOrigin\">"+str+"</span> </a>";
        }
        var width=parseInt(document.querySelector(".a_listBLock").getBoundingClientRect().width)*data.length+72;
        container.style.width=width+"px";
    };
    HomePageMain.prototype.initBanner=function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction : false
        });
    };




    new HomePageMain();
})();