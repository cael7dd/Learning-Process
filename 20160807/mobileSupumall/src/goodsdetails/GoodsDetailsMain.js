/**
 * Created by 87676 on 8/5/2016.
 */
(function () {
    function GoodsDetailsMain() {
        this.parseURL();
    }

    GoodsDetailsMain.prototype.parseURL = function () {
        var temp = /\goodsID=([^&]+)#/.exec(window.location.href);
        if (temp) {
            this.goodsID = temp[1];
            this.init();
        } else {
            document.body.innerHTML = "<h1>404 NOT FOUND</h1>";
        }
    };
    GoodsDetailsMain.prototype.init = function () {
        this.initHeight();
        this.lastPageFunc();
        this.loadData();
        this.addAmountFunc();
        this.addToShoppingCar();
    };
    GoodsDetailsMain.prototype.lastPageFunc=function () {
        document.querySelector("#headLast").href=window.sessionStorage.getItem("lastPage");
        window.sessionStorage.setItem("lastPage2",window.location.href);
    };
    GoodsDetailsMain.prototype.addToShoppingCar = function () {
        var self = this;
        var btn = document.querySelector("#btn_addToCar");
        btn.addEventListener("touchstart", function () {
            var userID = window.sessionStorage.getItem("CU");
            if (userID) {
                userID = EncodingEncryption(userID);
                $.ajax({
                    url: "http://datainfo.duapp.com/shopdata/updatecar.php",
                    data: {userID: userID, goodsID: self.goodsID, number: self.goodsAmount},
                    success:function (data) {
                        switch (data){
                            case "1":self.addCarSuccess();break;
                        }
                    }
                })
            }else{
                window.location.href="../login/index.html";
            }
        }.bind(this));
    };
    GoodsDetailsMain.prototype.addCarSuccess=function () {
        var car=document.querySelector("#d_carGoodsNum");
        car.style.display="block";
        car.style.animation="addCar .7s";
    };
    GoodsDetailsMain.prototype.addAmountFunc = function () {
        this.goodsAmount = 1;
        this.iptAmount = document.querySelector("#ipt_showAmount");
        var nodePlus = document.querySelector("#btnPlus");
        var nodeMinus = document.querySelector("#btnMinus");
        var temp;

        function judgeStyle() {
            if (temp == 1) {
                nodeMinus.style.webkitFilter = "brightness(.7)";
                nodePlus.style.webkitFilter = "brightness(1)";
            } else if (temp == 99) {
                nodeMinus.style.webkitFilter = "brightness(1)";
                nodePlus.style.webkitFilter = "brightness(.7)";
            } else {
                nodeMinus.style.webkitFilter = "brightness(1)";
                nodePlus.style.webkitFilter = "brightness(1)";
            }
        }

        this.iptAmount.addEventListener("input", function (event) {
            temp = parseInt(event.target.value);
            if (temp) {
                temp = Math.min(temp, 99);
                temp = Math.max(1, temp);
            } else {
                temp = 1;
            }
            event.target.value = temp;
            this.goodsAmount = temp;
            judgeStyle();

        }.bind(this));
        nodePlus.addEventListener("touchstart", function () {
            temp = this.goodsAmount = Math.min(this.goodsAmount + 1, 99);
            this.iptAmount.value = this.goodsAmount;
            judgeStyle();

        }.bind(this));
        nodeMinus.addEventListener("touchstart", function () {
            temp = this.goodsAmount = Math.max(this.goodsAmount - 1, 1);
            this.iptAmount.value = this.goodsAmount;
            judgeStyle();

        }.bind(this));
    };
    GoodsDetailsMain.prototype.initHeight = function () {
        document.body.style.height = window.innerHeight + "px";
    };
    GoodsDetailsMain.prototype.loadData = function () {
        var self = this;
        $.ajax({
            url: "http://datainfo.duapp.com/shopdata/getGoods.php",
            data: {goodsID: this.goodsID},
            dataType: "jsonp",
            success: function (data) {
                self.createBanner(data[0].goodsBenUrl);
                self.addHead(data[0][2]);
                self.addPrice(data[0][6], data[0][7], data[0][8]);
                self.addDetail(data[0][9]);
                self.addImg(data[0][5]);
            }
        });
    };
    GoodsDetailsMain.prototype.initBanner = function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false
        });
    };
    GoodsDetailsMain.prototype.addImg = function (data) {
        var temp = JSON.parse(data);
        var container = document.querySelector("#detailImg");
        for (var i = 0; i < temp.length; i++) {
            container.innerHTML += "<img src='" + temp[i] + "' width='100%'>"
        }
    };
    GoodsDetailsMain.prototype.createBanner = function (data) {
        var banner = document.querySelector("#banner");
        var temp = JSON.parse(data);
        for (var i = 0; i < temp.length; i++) {
            banner.innerHTML += "<div style=\"background:url('" + temp[i] + "') no-repeat 50% 50%; background-size: 100% 100%;height: 100%\"  class=\"swiper-slide\"></div>"
        }
        this.initBanner();
    };
    GoodsDetailsMain.prototype.addDetail = function (data) {
        var container = document.querySelector("#detailsContainer");
        var array = data.split("。");
        for (var i = 0; i < array.length; i++) {
            var div = document.createElement("div");
            div.className = "detailsBlock";
            div.innerHTML = array[i];
            container.appendChild(div);
        }
    };
    GoodsDetailsMain.prototype.addHead = function (data) {
        var head = document.querySelector("#detailTitle");
        head.innerHTML = data;

    };
    GoodsDetailsMain.prototype.addPrice = function (price, discount, amount) {
        var nodePrice = document.querySelector("#currentPrice");
        nodePrice.innerHTML = "￥" + price;
        var nodeDiscount = document.querySelector("#discount");
        if (discount != "0") {
            nodeDiscount.innerHTML = discount + "折";
        }
        var buyer = document.querySelector("#buyerAmount");
        buyer.innerHTML = "交易成功：" + amount;
    };


    new GoodsDetailsMain();
})();