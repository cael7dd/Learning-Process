/**
 * Created by 87676 on 8/17/2016.
 */
(function () {
    function Main() {
        this.init();
        this.passwordController();
    }
    Main.prototype.init=function () {
        this._app=angular.module("app",[]);
    };
    Main.prototype.passwordController=function () {
        var self=this;
        this._app.controller("passwordController",function ($scope) {
            $scope.errText=true;
            $scope.rightText=true;
            $scope.access=0;
            $scope.passResult=function () {
               if($scope.password){
                   if($scope.password.length<6){
                       $scope.access=0;
                       $scope.errText=false;
                       $scope.rightText=true;
                       return "密码太短！";
                   }else if($scope.password.length>20){
                       $scope.access=0;
                       $scope.errText=false;
                       $scope.rightText=true;
                       return "密码太长！";
                   }else{
                       $scope.errText=true;
                       $scope.rightText=false;
                       $scope.access=self.judge($scope.password);
                       return $scope.access;
                   }
               }
           } 
        });
    };
    Main.prototype.judge=function (value) {
        var a=0;
        if(/[A-Za-z]+/.test(value)){
            a++;
        }
        if(/[0-9]+/.test(value)){
            a++;
        }
        if(/[^\w\s]+/.test(value)){
            a++;
        }
        return a;
    };
    new Main();
})();
