/**
 * Created by 87676 on 8/10/2016.
 */
(function () {
    function Main() {
        this._id = -1;
        this.getElement();
        this.addListeners();
        this.getData();
    }

    Main.prototype.getElement = function () {
        this._nodeTable = document.querySelector("#table");
        this._nodeName = document.querySelector("#name");
        this._nodeAge = document.querySelector("#age");
        this._nodeSubmit = document.querySelector("#submit");
        this._nodeModify = document.querySelector("#modify");
    };
    Main.prototype.addListeners = function () {
        var self = this;
        this._nodeModify.addEventListener("click", function () {
            self.modifyData.call(self);
        }.bind(this));
        this._nodeSubmit.addEventListener("click", function (event) {
            event.preventDefault();
            self.addData.call(self);
        }.bind(this));
    };
    Main.prototype.addData = function () {
        var self = this;
        if(this._id==-1&&self._nodeName.value&&self._nodeAge.value){
            $.ajax({
                url: "/users/post",
                method: "post", data: {
                    name: self._nodeName.value, age: self._nodeAge.value
                },
                success: function (data) {
                    if (data == 1) {
                        self.clearAll();
                        self.getData();
                    }
                }
            });
        }
    };
    Main.prototype.modifyData = function () {
        var self = this;
        if (this._id != -1) {
            $.ajax({
                url: "/users/user",
                method: "put", data: {
                    id: self._id, name: self._nodeName.value, age: self._nodeAge.value
                },
                success: function (data) {
                    if (data == 1) {
                        self.clearAll();
                        self.getData();
                    }
                }
            });
        }

    };
    Main.prototype.clearAll = function () {
        this._id = -1;
        this._nodeAge.value = "";
        this._nodeName.value = "";
        this._nodeModify.disabled="disabled";
        this._nodeSubmit.disabled="";
    };
    Main.prototype.getData = function () {
        var self = this;
        $.ajax({
            url: "/users/user", method: "get", success: function (data) {
                if (data.state == 0) {
                    self.showData.call(self, data.users);
                }
            }
        })
    };
    Main.prototype.showData = function (data) {
        var self = this;
        this._nodeTable.innerHTML = "<th>ID</th><th>姓名</th><th>年龄</th><th>操作</th>";
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].age + "</td><td><span class='modify'>修改</span>/<span class='delete'>删除</span></td>";
            this._nodeTable.appendChild(tr);
        }
        this.addModify();
        this.addDelete();
    };
    Main.prototype.deleteData = function () {
        var self = this;
        if (this._id != -1) {
            $.ajax({
                url: "users/user", data: {id: self._id}, method: "delete", success: function (data) {
                    if (data == 1) {
                        self.clearAll();
                        self.getData();
                    }
                }
            });
        }

    };
    Main.prototype.addDelete = function () {
        var btn = document.querySelectorAll(".delete");
        var td = document.querySelectorAll("td");
        var self = this;
        for (var i = 0; i < btn.length; i++) {
            (function (m) {
                btn[m].addEventListener("click", function () {
                    self._id = td[m * 4].innerHTML;
                    self.deleteData();
                });
            })(i);
        }
    };
    Main.prototype.addModify = function () {
        var btn = document.querySelectorAll(".modify");
        var td = document.querySelectorAll("td");
        var self = this;
        for (var i = 0; i < btn.length; i++) {
            (function (m) {
                btn[m].addEventListener("click", function () {
                    self._nodeModify.disabled="";
                    self._nodeSubmit.disabled="disabled";
                    self._nodeName.value = td[m * 4 + 1].innerHTML;
                    self._nodeAge.value = td[m * 4 + 2].innerHTML;
                    self._id = td[m * 4].innerHTML;
                });
            })(i);
        }
    };
    new Main();
})();