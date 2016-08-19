/**
 * Created by 87676 on 7/20/2016.
 */
class Weather {
    constructor() {
        this.init();
    }

    init() {
        this._app = angular.module("app", []);
        this.addController();
        this.addElementTemplate();
        this.addChooseCityController();
    }


    getCity(result) {
        this._city = {
            id: result.area_id,
            districtCn: result.district_cn,
            nameCn: result.name_cn,
            nameEn: result.name_en,
            provinceCn: result.province_cn
        }
    }

    addChooseCityController() {
        this._app.controller("cityController", ($scope, $timeout, $http)=> {
            var t;
            $scope.$watch("ipt", (newValue)=> {
                if (newValue) {
                    $timeout.cancel(t);
                    t = $timeout(()=> {
                        $http({
                            url: "http://apis.baidu.com/apistore/weatherservice/citylist?cityname=" + newValue,
                            method: "get",
                            headers: {"apikey": "adae63a1d3d1265149a8d0e219ed21c2"}
                        }).success((data)=> {
                            console.log(data);
                            if (data.errNum == 0) {
                                $scope.list = data.retData;
                            }
                        });
                    }, 500);
                } else {
                    $timeout.cancel(t);
                    $scope.list = [];
                }

            });
            $scope.itemClick = (obj)=> {
                $scope.$emit('changeCity',obj);
                $scope.list = [];
                $timeout.cancel(t);
                $scope.ipt="";
            }
        })
    }


    addBackground() {
        var bgIndex = {
            "大雪": "big_snow.jpg",
            "多云1": "cloudy_day.jpg",
            "多云2": "cloudy_night.jpg",
            "雾": "frog.jpg",
            "大雨": "heavy_rain.jpg",
            "中雨":"10.jpg",
            "阵雨":"8.jpg",
            "雷阵雨":"930514.jpg",
            "小雨": "light_rain.jpg",
            "小雪": "light_snow.jpg",
            "暴雨": "rain_storm.jpg",
            "沙尘暴": "sand_dust.jpg",
            "晴1": "sun.jpg",
            "晴2": "sun_night.jpg",
            "阴1": "5.jpg",
            "阴2": "6.jpg"
        };
        var self = this;
        var crtTime = new Date().getHours();
        var isDay;
        (crtTime >= 7 && crtTime <= 19) ? isDay = 1 : isDay = 2;
        return `url('weather/weather/${(bgIndex[self._data.today.type + isDay]) ? bgIndex[self._data.today.type + isDay] : bgIndex[self._data.today.type]}')`;
    }

    addElementTemplate() {
        this._app.directive("topBlock", function () {
            return {
                restrict: "E",
                template: "<div class='d_topBlock'>" +
                "<div style='text-align: center;font-size: 1.4rem;margin-bottom: 2%' ng-bind='obj.top'></div>" +
                "<div ng-bind='obj.bottom'></div>" +
                "</div>",
                replace: true
            }
        });
        this._app.directive("forecastBlock", function () {
            return {
                restrict: "E",
                template: "<div class='d_forecastBlock'>" +
                "<div class='d_forecastLeftIcon' ng-style='{\"background-image\":forecastIcon(obj.type)}'></div>" +
                "<div class='d_forecastLeftDetail'>" +
                "<div class='d_forecastDetailTop' ng-bind='obj.week'></div>" +
                "<div class='d_forecastDetailBottom' ng-bind='obj.type'></div>" +
                "</div>" +
                "<div class='d_detailRight' ng-bind='obj.hightemp+\"/\"+obj.lowtemp'></div>" +
                "</div>",
                replace: true
            }
        });
        this._app.directive("todayIndex",function () {
            return{
                restrict:"E",
                template:"<div class='indexBlock'>" +
                "<div ng-bind='obj.name' style='color: #0074D9'></div>" +
                "<div ng-bind='obj.index' style='color: #C21F39;'></div>" +
                "<div ng-bind='obj.details' style='font-size: 1.2rem;color:#454545;text-align: left;text-indent: 2em;'></div></div>",
                replace:true
            }
        });
        this._app.directive("historyTop",function () {
            return {
                restrict:"E",
                template:"<div class='d_historyBlock'>" +
                "<div ng-bind='obj.week' class='topSingleBlock'></div>" +
                "<div ng-bind='obj.date.split(\"-\")[1]+\"/\"+obj.date.split(\"-\")[2]' class='topSingleBlock'></div>" +
                "</div>",
                replace:true
            }
        });
        this._app.directive("historyBottom",function () {
            return {
                restrict:"E",
                template:"<div class='d_historyBlock'>" +
                "<div style='width:2.5rem;height: 2.5rem; margin: 0 auto' ng-style='{\"background\":forecastIcon(obj.type)+\"no-repeat 50% 50%\",\"background-size\":\"contain\"}'></div>" +
                "<div ng-bind='obj.type' class='topSingleBlock'></div>" +
                "</div>",
                replace:true
            }
        });
    }

     static addForecast(data) {
        var weatherIndex = {
            "晴": "00", "多云": "01", "阴": "02", "阵雨": "03", "雷阵雨": "04", "雷阵雨伴有冰雹": "05", "雨夹雪": "06",
            "小雨": "07", "中雨": "08", "大雨": "09", "暴雨": "10", "大暴雨": "11", "特大暴雨": "12", "阵雪": "13",
            "小雪": "14", "中雪": "15", "大雪": "16", "暴雪": "17", "雾": "18", "冻雨": "19", "沙尘暴": "20",
            "小到中雨": "21", "中到大雨": "22", "大到暴雨": "23", "暴雨到大暴雨": "24", "大暴雨到特大暴雨": "25", "小雪到中雪": "26", "中雪到大雪": "27",
            "大雪到暴雪": "28", "浮尘": "29", "扬沙": "30", "强沙尘暴": "31", "霾": "55"
        };
        var crtTime = new Date().getHours();
        var isDay;
        (crtTime >= 7 && crtTime <= 19) ? isDay = "d" : isDay = "n";
        return `url('weather/${isDay + weatherIndex[data]}.jpg')`;
    }

    addController() {
        var self = this;
        this._app.controller("controller", ($scope, $http)=> {
            $scope.isEdit=0;
            $scope.height = window.innerHeight;
            $scope.urlCity = "石景山";
            var crtTime=new Date().getHours();
            $scope.isDay=(crtTime>= 7 && crtTime <= 19);
            $http({
                url: "http://apis.baidu.com/apistore/weatherservice/citylist?cityname=" + $scope.urlCity,
                method: "get",
                headers: {"apikey": "adae63a1d3d1265149a8d0e219ed21c2"}
            }).success((data)=> {
                if (data.errNum == 0) {
                    getData(data.retData[0]);
                }

            });
            $scope.$on("changeCity",(event,obj)=>{
                getData(obj);
            });
            function getData(cityData) {
                $scope.isEdit=0;
                self.getCity(cityData);
                $http({
                    url: `http://apis.baidu.com/apistore/weatherservice/recentweathers?cityname=${self._city.nameCn}&cityid=${self._city.id}`,
                    method: "get",
                    headers: {"apikey": "adae63a1d3d1265149a8d0e219ed21c2"}
                }).success((data)=> {
                    if (data.errMsg == "success") {
                        self._data = data.retData;
                        console.log(self._data);
                    }
                    $scope.bg = self.addBackground();
                    $scope.temp = self._data.today.curTemp;
                    $scope.location = self._data.city;
                    $scope.todayType = self._data.today.type;
                    $scope.topBlock = [{top: self._data.today.fengxiang, bottom: self._data.today.fengli},
                        {top: "最高气温", bottom: self._data.today.hightemp}, {
                            top: "最低气温",
                            bottom: self._data.today.lowtemp
                        }];
                    $scope.forecastData = self._data.forecast;
                    $scope.forecastIcon = Weather.addForecast;
                    $scope.forecastIndex=self._data.today.index;
                    $scope.allData=self._data.history.concat(self._data.today).concat(self._data.forecast);
                    Weather.drawCanvas($scope.allData);
                });
            }
        })
    }
    static drawCanvas(data){
        console.log(data.length);
        var max=-Infinity,min=Infinity,hIndex=[],lIndex=[];
        for(var i=0;i<data.length;i++){
            var h=parseInt(data[i].hightemp);
            var l=parseInt(data[i].lowtemp);
            hIndex.push(h);
            lIndex.push(l);
            (max<h)?max=h:'';
            (min>l)?min=l:'';
        }
        var step=60/(max-min);
        var context=document.querySelector("#canvas").getContext("2d");
        context.clearRect(0,0,720,100);
        context.lineWidth=1;
        context.lineJoin="round";
        context.lineCap="round";
        context.strokeStyle="#f30";
        context.font="14px Microsoft YaHei";
        context.lineWidth=2;
        context.beginPath();
        context.moveTo(30,step*(max-hIndex[0])+20);
        context.arc(30,step*(max-hIndex[0])+20,2,0,Math.PI*2);
        context.fillText(hIndex[0]+"℃",15,step*(max-hIndex[0])+14);
        for(i=1;i<data.length;i++){
            context.fillText(hIndex[i]+"℃",60*i+15,step*(max-hIndex[i])+14);
            context.arc(60*i+30,step*(max-hIndex[i])+20,2,0,Math.PI*2);
            context.lineTo(60*i+30,step*(max-hIndex[i])+20);
        }
        context.stroke();
        context.closePath();
        context.beginPath();
        context.strokeStyle="#98F5FF";
        context.moveTo(30,step*(max-lIndex[0])+20);
        context.arc(30,step*(max-lIndex[0])+20,2,0,Math.PI*2);
        context.fillText(lIndex[0]+"℃",15,step*(max-lIndex[0])+40);
        for(i=1;i<data.length;i++){
            context.fillText(lIndex[i]+"℃",60*i+15,step*(max-lIndex[i])+40);
            context.arc(60*i+30,step*(max-lIndex[i])+20,2,0,Math.PI*2);
            context.lineTo(60*i+30,step*(max-lIndex[i])+20);
        }
        context.stroke();
        context.closePath();
    }
}
var weather = new Weather();
