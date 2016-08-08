/**
 * Created by 87676 on 8/3/2016.
 */
(function () {
    function LogInMain() {
        this.access = [0, 0];
        this.isSeen=false;
        this.jump=false;
        this.accessIndex=["nodeTel","nodePassword"];
        this.alertIndex=["用户名","密码"];
        this.storage=localStorage;
        this.addHrefToA();
        this.getElement();
        this.seePassword();
        this.addText();
        this.addListeners();
    }
    LogInMain.prototype.addHrefToA=function () {
        var temp=window.sessionStorage.getItem("lastPage2");
        if(temp[0]=="P"){
            document.querySelector("#headLast").href="../homepage/index.html";
            this.lastPage=temp.substring(1,temp.length);
        }else{
            document.querySelector("#headLast").href=this.lastPage=temp;
            
        }
        
    };
    LogInMain.prototype.addText=function () {
        var user=this.storage.key(0);
        var password=this.storage.getItem(user);
        if(user){
            var trueUser=EncodingEncryption(user);
            this.nodeTel.value=trueUser;
            this.tel=trueUser;
            this.access[0]=1;
            if(password!="null"){
                password=EncodingEncryption(password);
                this.nodePassword.value=password;
                this.access[1]=1;
                this.password=password;
                this.nodeRemember.checked="checked";
            }
        }

    };
    LogInMain.prototype.seePassword=function () {
        var btn=document.querySelector("#see");
        btn.addEventListener("touchstart",function () {
            if(!this.isSeen){
                this.nodePassword.type="text";
                this.isSeen=true;
                btn.style.webkitFilter="opacity(.5)";
            }else{
                this.nodePassword.type="password";
                btn.style.webkitFilter="opacity(1)";
                this.isSeen=false;
            }
        }.bind(this));
    };
    LogInMain.prototype.getElement = function () {
        this.nodeTel = document.querySelector("#iptTel");
        this.nodePassword = document.querySelector("#iptPassword");
        this.nodeSubmit = document.querySelector("#resignBtn");
        this.nodeResult = document.querySelector("#result");
        this.nodeAlert = document.querySelector("#alert");
        this.nodeLoading = document.querySelector("#loading");
        this.nodeRemember=document.querySelector("#remember");
    };
    LogInMain.prototype.addListeners = function () {
        var self = this;
        this.nodeTel.addEventListener("blur", function () {
            if (this.value.length != 11) {
                self.access[0] = 0;
            } else {
                self.access[0] = 1;
                self.tel = this.value;
            }
        });
        this.nodePassword.addEventListener("blur", function () {
            if (this.value.length >= 6 && this.value.length <= 16) {
                self.access[1] = 1;
                self.password = this.value;
            } else {
                self.access[1] = 0;
            }
        });
        this.nodeSubmit.addEventListener("click", function () {
            self.nodeResult.style.display="block";
            if (self.judgeIpt()) {
                $.ajax({
                    url: "http://datainfo.duapp.com/shopdata/userinfo.php",
                    data: {status: "login", userID: self.tel, password: self.password},
                    method:"post",
                    success:function (data) {
                        var str = "";
                        switch (data) {
                            case "0":
                                str = "用户名不存在！";
                                break;
                            case "2":
                                str = "用户名密码不符！";
                                break;
                            default:
                               str="登陆成功！";
                                self.rememberUser.call(self,data);
                                break;
                        }
                        self.changeAlert(str);
                    },
                    error:function () {
                        self.changeAlert("登陆超时");
                    }
                });
            }
        });
    };
    LogInMain.prototype.rememberUser=function (data) {
        var temp=JSON.parse(data);
        window.sessionStorage.setItem("CU",EncryptionCode(temp[1]));
        if(this.nodeRemember.checked){
            this.storage.setItem(EncryptionCode(temp[1]),EncryptionCode(this.password));
        }else if(!this.storage.getItem(temp[1])){
            this.storage.setItem(EncryptionCode(temp[1]),null);
        }
        this.jump=true;




    };
    LogInMain.prototype.judgeIpt=function () {
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
    LogInMain.prototype.changeAlert=function (text){
        var self=this;
        this.nodeLoading.style.display="none";
        this.nodeAlert.style.display = "block";
        this.nodeAlert.style.animation = "zoomIn .5s forwards";
        this.nodeAlert.innerHTML=text;
        setTimeout(function () {
            self.nodeAlert.style.display="none";
            self.nodeResult.style.display="none";
            self.nodeLoading.style.display="block";
            self.nodeAlert.style.animation="null";
            if(self.jump){
                window.location.href=self.lastPage;
            }
        },1200);
    };

    new LogInMain();
})();