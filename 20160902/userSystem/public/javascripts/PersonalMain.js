/**
 * Created by 87676 on 9/1/2016.
 */
(function () {
    function Main() {
        this._app = angular.module("app", []);
        this.changeController();
        this.contentController();
    }


    Main.prototype.contentController = function () {

        var self = this;
        this._app.controller("contentController", function ($scope, $rootScope, $http) {
            var watch = $rootScope.$watch("memberData", function (newData) {
                $scope.memberData = newData;
                if ($scope.memberData) {
                    watch();
                }
            });
            $scope.setAdmin = function (obj) {
                var index = $scope.memberData.indexOf(obj);
                $http({
                    url: "/api/setAdmin",
                    method: "post",
                    data: {id: obj.id}
                }).success(function (data) {
                    if (data.state == 0) {
                        $scope.memberData[index].level = 2;
                    }
                });
            };
            $scope.cancelAdmin = function (obj) {
                var index = $scope.memberData.indexOf(obj);
                $http({
                    url: "/api/cancelAdmin",
                    method: "post",
                    data: {id: obj.id}
                }).success(function (data) {
                    if (data.state == 0) {
                        $scope.memberData[index].level = 1;
                    }
                });
            };
            $scope.removeMember = function (obj) {
                var index = $scope.memberData.indexOf(obj);
                $http({
                    url: "/api/removeMember",
                    method: "post",
                    data: {id: obj.id}
                }).success(function (data) {
                    if (data.state == 0) {
                        $scope.memberData.splice(index, 1);
                    }
                });
            }
        });

    };
    Main.prototype.changeController = function () {
        var self = this;
        var gotElement = false;

        this._app.controller("modifyData", function ($scope, $http, $rootScope, $timeout) {
            var _nodeNiceName, _nodeResume, _nodeOriginPassword, _nodeNewPassword, _nodeRepeatPassword;

            function getElement() {
                _nodeNiceName = document.querySelector("#niceName");
                _nodeResume = document.querySelector("#resume");
                _nodeOriginPassword = document.querySelector("#originPassword");
                _nodeNewPassword = document.querySelector("#newPassword");
                _nodeRepeatPassword = document.querySelector("#repeatPassword");
            }

            $http({
                url: "/api/personal",
                method: "post"
            }).success(function (data) {
                if (data.state == 0 || data.state == 11) {
                    $rootScope.memberData = data.memberData;
                    $rootScope.data = data.data;
                } else {
                    location.href = location.origin + "/login";
                }

            });
            $scope.changeNiceName = function () {
                getElement();
                var data = $rootScope.data;
                if (_nodeNiceName.value != data.niceName) {
                    $http({
                        url: "/api/changeNiceName",
                        method: "post",
                        data: {niceName: _nodeNiceName.value}
                    }).success(function (data) {
                        if (data.state != 0) {
                            self.showAlert(data.msg);
                        } else {
                            $rootScope.data.niceName = _nodeNiceName.value;
                        }
                    });
                }
            };
            $scope.quit = function () {
                $http({
                    url: "/api/quit",
                    method: "post"
                }).success(function () {
                    location.href = location.origin + "/login";
                })
            };
            $scope.changeResume = function () {
                getElement();
                var data = $rootScope.data;
                if (_nodeResume.value != data.info && (_nodeResume.value || data.info)) {
                    $http({
                        url: "/api/changeInfo",
                        method: "post",
                        data: {info: _nodeResume.value}
                    }).success(function (data) {
                        if (data.state != 0) {
                            self.showAlert(data.msg);
                        } else {
                            $rootScope.data.info = _nodeResume.value;
                        }
                    });
                }
            };
            $scope.cancel = function () {
                $scope.showBlock = false;
                getElement();
                _nodeNewPassword.value = _nodeOriginPassword.value = _nodeRepeatPassword.value = "";
            };

            $scope.clickSave = function () {
                getElement();
                if (!_nodeOriginPassword.value) {
                    self.showAlert("请输入密码！");
                    return;
                }
                var data = $rootScope.data;
                if (md5(md5(md5(_nodeOriginPassword.value) + data.logName, 32), 32) == data.password) {
                    if (!_nodeNewPassword.value) {
                        self.showAlert("请输入新密码！");
                        return;
                    }
                    if (_nodeNewPassword.value == _nodeRepeatPassword.value) {
                        var a = _nodeNewPassword.value;
                        $http({
                            url: "/api/changePassword",
                            method: "post",
                            data: {password: md5(md5(a) + data.logName, 32)}
                        }).success(function (data) {
                            if (data.state == 0) {
                                document.querySelector("#submitPass").innerHTML = data.msg;
                                $timeout(function () {
                                    $scope.showBlock = false;
                                }, 1000);

                            } else {
                                self.showAlert(data.msg);
                            }
                        });
                    } else {
                        self.showAlert("两次输入不一致！");
                    }
                } else {
                    self.showAlert("密码错误！");
                }
            };
        });
    };
    Main.prototype.showAlert = function (message) {
        var _alert = $("#warning");
        clearTimeout(this.timeID);
        _alert.html(message);
        _alert.css({"animation": "showAlert 3s"});
        this.timeID = setTimeout(function () {
            _alert.css({"animation": "null"});
        }, 3000);
    };
    new Main();
})();