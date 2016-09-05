/**
 * Created by 87676 on 9/1/2016.
 */
(function () {
    function Main() {
        this._alert = $("#warning");
        this.submitFunc();
    }

    Main.prototype.submitFunc = function () {
        var self = this;
        this.timeID = 0;
        $("#form").on("submit", function (event) {
            event.preventDefault();
            if(this.logName.value&&this.niceName.value&&this.password.value){
                if (this.password.value == this.passwordRepeat.value) {
                    var a = this.logName.value;
                    var b = this.password.value;
                    self.uploadToServer.call(self, {
                        logName: a,
                        niceName: this.niceName.value,
                        password: md5(md5(b) + a, 32)
                    });
                } else {
                    self.showAlert.call(self, "两次输入密码不一致！");
                }
            }
        })
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
    Main.prototype.uploadToServer = function (obj) {
        var self = this;
        $.ajax({
            url: "/api/resign",
            method: "post",
            data: obj,
            success: function (data) {
                switch (data.state) {
                    case 0:
                        self.logSuccess.call(self, data);
                        break;
                    default:
                        self.showAlert(data.msg);
                        break;
                }
            }
        });
    };
    Main.prototype.logSuccess = function (data) {
        $("#btn").val("注册成功，即将跳转");
        setTimeout(function () {
            window.location.href = "/personal/user";
        }, 1000);
    };
    new Main();
})();