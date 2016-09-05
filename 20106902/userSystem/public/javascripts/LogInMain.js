/**
 * Created by 87676 on 9/1/2016.
 */
(function () {
    function Main() {
        this._alert=$("#warning");
        this.formFunc();
    }
    Main.prototype.formFunc=function () {
        var self=this;
        $("#form").on("submit",function (event) {
            event.preventDefault();
            var a=this.logName.value,b=this.password.value;
            if(a&&b){
                self.uploadToServer({logName:a,password:md5(md5(b) + a, 32)});
            }
        });
    };
    Main.prototype.uploadToServer=function (obj) {
        var self=this;
        $.ajax({
            url:"api/login",
            method:"post",
            data:obj,
            success:function (data) {
                switch (data.state){
                    case 0: self.logSuccess.call(self);break;
                    default:self.showAlert(data.msg);break;
                }
            }
        });
    };
    Main.prototype.showAlert = function (message) {
        var self = this;
        clearTimeout(this.timeID);
        this._alert.html(message);
        this._alert.css({"animation": "showAlert 3s"});
        this.timeID = setTimeout(function () {
            self._alert.css({"animation": "null"});
        }, 3000);
    };
    Main.prototype.logSuccess=function () {
        $("#btn").val("登陆成功，即将跳转");
        setTimeout(function () {
            window.location.href="/personal/user";
        },1000);
    };
    new Main();
})();