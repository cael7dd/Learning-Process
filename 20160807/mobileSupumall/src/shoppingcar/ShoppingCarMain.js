/**
 * Created by 87676 on 8/5/2016.
 */
(function () {
    function ShoppingCarMain() {
        this.getUser();
    }
    ShoppingCarMain.prototype.getUser=function () {
        var temp=window.sessionStorage.getItem("CU");
        if(temp){
            this.userID=EncodingEncryption(temp);
            this.init();
        }else{
            window.location.href="../login/index.html";
        }
    };
    ShoppingCarMain.prototype.init=function () {
        this.isEdit=false;
        this.changedGood=[];
        this.initHeight();
        this.addLastPageFunc();
        this.getShoppingCarGoods();
    };
    ShoppingCarMain.prototype.addLastPageFunc=function () {
        document.querySelector("#headLast").href=window.sessionStorage.getItem("lastPage2");
    };
    ShoppingCarMain.prototype.getShoppingCarGoods=function () {
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/getCar.php",data:{userID:this.userID},dataType:"jsonp",success:function (data) {
           self.createGoodsList.call(self,data);
        }});
    };
    ShoppingCarMain.prototype.createGoodsList=function (data) {
        var container=document.querySelector("#d_goodListContainer");

        for(var i=0;i<data.length;i++){
            container.innerHTML+="<div class=\"d_goodList\"> <input type=\"checkbox\" checked=\"checked\" class=\"goodsLeftCheck\">"+
            "<a href=\"../goodsdetails/index.html?goodsID="+data[i][0]+"#\" class=\"a_shoppingLeftImg\" style='background: url(\""+data[i][3]+"\");background-size: 100% 100%'></a> <div class=\"d_goodRightText\">"+
            "<a href=\"../goodsdetails/index.html?goodsID="+data[i][0]+"#\" class=\"a_goodTitle\">"+data[i][2]+"</a> <label class=\"s_goodsNum\"> 数量：<input type=\"number\" disabled='disabled' class=\"iptGoodNum\" value='"+
                data[i].number+"'>"+
            "<button class=\"btn_delete\">删除</button> </label> <span class=\"s_goodPrice\">"+
            "<span class=\"s_goodCurrentPrice\">￥"+data[i][4]+"</span> ￥"+(parseFloat(data[i][4])/((data[i][5]==0)?1:parseInt(data[i][5])/10)).toFixed(2)+" </span> </div> </div>";
        }
        this.addGoodIDToDom(data);
        this.addEditBtnFunc();
        this.addNumBlurEvent(data);
        this.addCheckBtnFunc();
        this.checkChecks();
    };
    ShoppingCarMain.prototype.addGoodIDToDom=function (data) {
        this.iptNum=document.querySelectorAll(".iptGoodNum");
        for(var i=0;i<this.iptNum.length;i++){
            this.iptNum[i].goodID=data[i].goodsID;
        }
    };
    ShoppingCarMain.prototype.addEditBtnFunc=function () {
        var self=this;
        var btn=document.querySelector("#s_edit");
        this.btnDel=document.querySelectorAll(".btn_delete");

        btn.addEventListener("touchstart",function () {
            if(!self.isEdit){
                for(var i=0;i<self.btnDel.length;i++){
                    self.btnDel[i].style.animation="zoomIn .5s forwards";
                    self.iptNum[i].disabled="";
                }
                btn.innerHTML="确认";
                btn.style.color="#e5004b";
                self.isEdit=true;
            }else{
                for(var i=0;i<self.btnDel.length;i++){
                    self.btnDel[i].style.animation="zoomOut .5s forwards";
                    self.iptNum[i].disabled="disabled";
                }
                btn.innerHTML="编辑";
                btn.style.color="#999999";
                setTimeout(self.actChange.bind(self),100);
                self.checkChecks();
                self.isEdit=false;
            }

        });
        this.addDelFunc();
    };
    ShoppingCarMain.prototype.checkChecks=function () {
        var allChoose=true;
        var currentPrice=document.querySelectorAll(".s_goodCurrentPrice");
        var btnChooseAll=document.querySelector("#ipt_chooseAll");
        var domTotalAmount=document.querySelector("#btn_pay");
        var domTotalMoney=document.querySelector("#b_totalAmount");
        var totalMoney=0;
        var totalAmount=0;

        for(var i=0;i<this.btnCheck.length;i++){
            if(this.btnCheck[i].checked){
                totalMoney+=parseInt(this.iptNum[i].value)*parseInt(/￥(.+)/.exec(currentPrice[i].innerHTML)[1]);
                totalAmount+=parseInt(this.iptNum[i].value);
            }else{
                allChoose=false;
            }
        }
        (allChoose)?btnChooseAll.checked="checked":btnChooseAll.checked="";
        domTotalAmount.innerHTML="结算（"+totalAmount+"）";
        domTotalMoney.innerHTML="￥"+totalMoney;

    };
    ShoppingCarMain.prototype.addCheckBtnFunc=function () {
        var self=this;
        this.btnCheck=document.querySelectorAll(".goodsLeftCheck");
        for(var i=0;i<this.btnCheck.length;i++){
            (function (m) {
                self.btnCheck[m].addEventListener("change",function () {
                    self.checkChecks();
                });
            })(i);
        }
        var checkAll=document.querySelector("#ipt_chooseAll");
        checkAll.addEventListener("change",function () {
            if(this.checked){
                for(var i=0;i<self.btnCheck.length;i++){
                    self.btnCheck[i].checked="checked";
                }
            }else {
                for(var i=0;i<self.btnCheck.length;i++){
                    self.btnCheck[i].checked="";
                }
            }
            self.checkChecks();
        });
    };
    ShoppingCarMain.prototype.actChange=function () {
        var self=this;
        for(var i=0;i<this.changedGood.length;i++){
            for(var j=i+1;j<this.changedGood.length;j++){
                if(this.changedGood[i]==this.changedGood[j]){
                    this.changedGood.splice(j,1);
                }
            }
        }
        for(i=0;i<this.changedGood.length;i++){
            (function (m) {
                $.ajax({url:"http://datainfo.duapp.com/shopdata/updatecar.php",data:{userID:self.userID,goodsID:self.iptNum[self.changedGood[m]].goodID,number:self.iptNum[self.changedGood[m]].value},
                success:function (data) {
                    switch (data){
                        case "1":self.changedGood.splice(m,1);break;
                    }
                }})
            })(i);
        }
    };
    ShoppingCarMain.prototype.addDelFunc=function () {
        var self=this;
        var goodsBlock=document.querySelectorAll(".d_goodList");
        for(var i=0;i<this.btnDel.length;i++){
            (function (m) {
                self.btnDel[m].addEventListener("touchstart",function () {
                    goodsBlock[m].style.animation="scaleOut 1s forwards";
                    setTimeout(function () {
                        goodsBlock[m].style.display="none";
                    },1000);

                    self.iptNum[m].value=0;
                    self.changedGood.push(m);
                });
            })(i);
        }
    };
    ShoppingCarMain.prototype.addNumBlurEvent=function (data) {
        var self=this;
        for(var i=0;i<this.iptNum.length;i++){
            (function (m) {
                self.iptNum[m].addEventListener("blur",function () {
                    if(self.iptNum[m].value!=data[m].number){
                        self.changedGood.push(m);
                    }
                });
            })(i);
        }
    };
    ShoppingCarMain.prototype.initHeight=function () {
        document.body.style.height=window.innerHeight+"px";
    };
    new ShoppingCarMain();
})();