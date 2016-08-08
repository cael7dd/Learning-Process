/**
 * Created by 87676 on 8/3/2016.
 */
(function () {
    function Main() {
        this.jump=false;
        this.getElement();
        this.addListeners();
        this.addHrefToA();
        this.access = [0, 0, 0, 1];
        this.accessIndex=["nodeTel","nodeCheck","nodePassword"];
        this.alertIndex=["手机号","验证码","密码"];
        this.clickable=true;
       
    }
    Main.prototype.addHrefToA=function () {
        var temp=window.sessionStorage.getItem("lastPage2");
        if(temp[0]=="P"){
            document.querySelector("#headLast").href="../homepage/index.html";
            this.lastPage=temp.substring(1,temp.length);
        }else{
            document.querySelector("#headLast").href=this.lastPage=temp;
        }
    };
    Main.prototype.getElement = function () {
        this.nodeTel = document.querySelector("#iptTel");
        this.nodeCheck = document.querySelector("#iptCheck");
        this.nodePassword = document.querySelector("#iptPassword");
        this.nodePaper = document.querySelector("#read");
        this.nodeSubmit = document.querySelector("#resignBtn");
        this.nodeResult = document.querySelector("#result");
        this.nodeAlert = document.querySelector("#alert");
    };
    Main.prototype.addListeners = function () {
        var self = this;
        this.nodeTel.addEventListener("blur", function () {
            if (this.nodeTel.value.length != 11) {
                this.access[0] = 0;
            } else {
                this.access[0] = 1;
                this.tel = this.nodeTel.value;
            }
        }.bind(this));
        this.nodeCheck.addEventListener("blur", function () {
            if (this.nodeCheck.value.length != 4) {
                this.access[1] = 0;
            } else {
                this.access[1] = 1;
            }
        }.bind(this));
        this.nodePassword.addEventListener("blur", function () {
            if (this.nodePassword.value.length <= 16 && this.nodePassword.value.length >= 6) {
                this.access[2] = 1;
                this.password = this.nodePassword.value;
            } else {
                this.access[2] = 0;

            }
        }.bind(this));
        this.nodePaper.addEventListener("change", function () {
            if (this.nodePaper.checked) {
                this.nodeSubmit.style.background="rgb(232, 0, 70)";
                this.clickable=true;
                this.access[3] = 1;
            } else {
                this.nodeSubmit.style.background="rgb(153, 153, 153)";
                this.access[3] = 0;
                this.clickable=false;

            }
        }.bind(this));
        this.nodeSubmit.addEventListener("click", function () {
            if (this.clickable&&this.judgeIpt()) {
                $.ajax({
                    url: "http://datainfo.duapp.com/shopdata/userinfo.php",
                    method: "post",
                    data: {status: "register", userID: this.tel, password: this.password},
                    success: function (data) {
                        self.returnResult.call(self,data);
                    },
                    error:function (data) {
                        self.returnResult.call(self,3);
                    }
                });
            }
        }.bind(this));
    };
    Main.prototype.returnResult = function (data) {
        var str = "";
        switch (data) {
            case "0":
                str = "用户名已存在！";
                break;
            case "1":
                str = "注册成功！";
                this.rememberLog();
                break;
            case "2":
                str = "服务器错误！";
                break;
            case "3":
                str = "连接超时！";
                break;
        }
        this.changeAlert(str);


    };
    Main.prototype.rememberLog=function () {
        window.sessionStorage.setItem("CU",EncryptionCode(this.tel));
        window.localStorage.setItem(EncryptionCode(this.tel)," ");
        this.jump=true;
    };
    Main.prototype.changeAlert=function (text) {
        var self=this;
        this.nodeResult.style.display = "block";
        this.nodeAlert.style.animation = "zoomIn .5s forwards";
        this.nodeAlert.innerHTML=text;
        setTimeout(function () {
            self.nodeResult.style.display="none";
            self.nodeAlert.style.animation="null";
            if(self.jump){
                window.location.href=self.lastPage;
            }
        },1200);
    };
    Main.prototype.judgeIpt = function () {
        var temp = 1;
        for (var i = 0; i < this.access.length; i++) {
            temp *= this.access[i];
            if(this.access[i]==0){
                break;
            }
        }
        if(!temp){
            if(!this[this.accessIndex[i]].value){
                this.changeAlert("请输入"+this.alertIndex[i]+"!");
            }else{
                this.changeAlert(this.alertIndex[i]+"格式不正确！");
            }
        }

        return temp;
    };
    new Main();
})();