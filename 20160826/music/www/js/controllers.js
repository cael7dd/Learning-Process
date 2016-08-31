/**
 * Created by 87676 on 8/25/2016.
 */
angular.module("app.controllers", [])
/******************************************播放列表*************************************************/
  .controller("songListController", function ($scope, LocalList) {
    $scope.list = LocalList.getLocalList();
    //侦听打开播放列表事件，重新获取$scope.list
    $scope.$on("openLocal", function () {
      $scope.list = LocalList.getLocalList();
      console.log($scope.list);
    });
    //删除曲目，在factory中删除指定的曲目
    $scope.removeSong = function (index) {
      $scope.list = LocalList.removeIndexList(index);
    };
    //点击曲目，向上级menus传递事件，播放点击曲目
    $scope.playSong = function (obj) {
      $scope.$emit("playSong", obj);
    };
  })




  /******************************************menus*************************************************/
  .controller("menusController", function ($scope, $rootScope, GetData, LocalList, playingControl, $interval) {
    // 点击播放列表时，向下级localList发送事件，以便重新获取list
    $scope.clickLocal = function () {
      $scope.$broadcast("openLocal", "");
    };
    // 点击在线搜索时，向下级searchList发送事件，以便重新校对已添加的曲目
    $scope.clickSearch = function () {
      $scope.$broadcast("openSearch", "");
    };
    //获取audio标签 侦听播放指定曲目事件，根据传过来的对象的hash请求播放路径并添加到audio标签中
    $scope.audio = document.querySelector("#audio");
    $scope.$on("playSong", function (event, obj) {
      playSong(obj);
    });
    var timeLength;

    function playSong(obj) {
      GetData.getSongUrl(obj.hash).then(function (data) {
        $scope.song = data.data;
        $scope.song.songName = obj.songname;
        timeLength = $scope.song.timeLength;
        //获取播放地址的同时，获取歌曲相关信息，展示在footer上
        playingControl.playSong(data, obj).then(function (data) {
          $scope.singer = data;
          $scope.$broadcast("reloadData", "");
          $rootScope.timeCount = 0;
        });
      });
    }

    //播放键功能
    $scope.clickPauseBtn = function () {
      if (!$scope.audio.src) {
        $scope.clickNextSong();
      }
      ($scope.audio.paused) ? $scope.audio.play() : $scope.audio.pause();
    };
    //下一曲功能
    $scope.clickNextSong = function () {
      var obj = (LocalList.getNextSong());
      if (obj) {
        playSong(obj);
      }
    };
    //播放结束下一曲
    $scope.audio.addEventListener("ended", function () {
      $scope.clickNextSong();
    });
    var intervalId;
    $rootScope.timeCount = 0;
    function createInterval() {
      intervalId = $interval(function () {
        if (!$scope.audio.paused && $scope.audio.src) {
          $rootScope.timeCount=Math.round($scope.audio.currentTime*10);
          $rootScope.playedLength = $rootScope.timeCount * 10 / timeLength;
        }
      }, 100);
    }

    createInterval();

    $scope.isHidden = false;
    $scope.clickToDetail = function () {
      $scope.isHidden = !$scope.isHidden;
    };
    $scope.$on("backFromDetail", function () {
      $scope.clickToDetail();
    })
  })
  .controller("songDetailController", function ($scope, LocalList, $ionicHistory, playingControl, $ionicScrollDelegate) {
    $scope.audio = document.querySelector("#audio");
    $scope.swipeRight = function () {
      $scope.$emit("backFromDetail", "");
      $ionicHistory.goBack();
    };
    $scope.isSingle=false;
    $scope.changeMode=function () {
      $scope.isSingle=!$scope.isSingle;
      LocalList.changeMode($scope.isSingle);
    };
    if ($scope.audio.src) {
      $scope.$on("reloadData", function () {
        loadData();
      });
      loadData();
      function loadData() {
        playingControl.getSongInfo().then(function (data) {
          $scope.data = data;
          var minutes = parseInt($scope.data.duration / 60);
          var seconds = $scope.data.duration - minutes * 60;
          $scope.duration = fixTime(minutes) + ":" + fixTime(seconds);
          $scope.currentWordIndex = -1;
        });
      }


      function fixTime(value) {
        if (parseInt(value) / 10 < 1) {
          return "0" + value;
        } else return value;
      }

      //播放键功能
      $scope.clickPauseBtn = function () {
        if (!$scope.audio.src) {
          clickNextSong();
        }
        ($scope.audio.paused) ? $scope.audio.play() : $scope.audio.pause();
      };
      //换曲功能
      $scope.changeSong = function (isNext) {
        var obj;
        (isNext) ? obj = LocalList.getNextSong() : obj = LocalList.getLastSong();
        if (obj) {
          $scope.$emit("playSong", obj);
        }
      };
      //播放结束下一曲
      $scope.audio.addEventListener("ended", function () {
        $scope.changeSong(true);
      });
      $scope.$watch("timeCount", function (newValue) {
        if (newValue % 10 < 2) {
          var minutes = parseInt(newValue / 600);
          var seconds = parseInt((newValue - minutes * 600) / 10);
          $scope.currentTime = fixTime(minutes) + ":" + fixTime(seconds);
        }
        if ($scope.currentWordIndex == $scope.data.lrc.length - 1) {
          return;
        }
        var range = newValue - $scope.data.lrc[$scope.currentWordIndex + 1].timeStamp;
        if (range >= 0) {
          if (range > 0) {
            for (var i = Math.max(0, $scope.currentWordIndex); i < $scope.data.lrc.length; i++) {
              if (newValue - $scope.data.lrc[i].timeStamp < 0) {
                $scope.currentWordIndex = i - 2;
                break;
              }
            }
          }
          $scope.currentWordIndex++;
          $ionicScrollDelegate.$getByHandle("lrcScroll").scrollTo(0, 52 * $scope.currentWordIndex, true);
        }
      });
    }

  })




  /******************************************搜索列表*************************************************/
  .controller("searchSongController", function ($scope, GetData, LocalList) {
    //点击曲目，向上级menus传递事件，播放点击曲目
    $scope.playSong = function (obj) {
      $scope.$emit("playSong", obj);
    };
    //默认禁用infiniteScroll
    $scope.moreToLoad = false;
    $scope.searchList = [];
    var page = 1;
    //在点击搜索或者滑动到页尾时，加载更多数据，page自加1
    $scope.doSearch = function (value, isSearch) {
      //如果是通过搜索加载，则重置存储已添加的曲目的对象
      if (isSearch) {
        page = 1;
        $scope.searchList = [];
        $scope.addedSong = {};
      }
      GetData.getSearchData(value, page++).then(function (data) {
        if (data.data.data) {
          $scope.searchList = $scope.searchList.concat(data.data.data);
          //得到数据后，停止下拉加载，启用infiniteScroll
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.moreToLoad = true;
        } else {
          //当得不到更多数据时，禁用infiniteScroll
          $scope.moreToLoad = false;
        }
      }).catch(function () {
        $scope.moreToLoad = false;
      })
    };
    //点击右侧加号，添加该曲目到播放列表，并记录已添加的曲目
    $scope.addToList = function (obj, num) {
      LocalList.addToList(obj);
      $scope.addedSong[num] = true;
    };
    //接收到openSearch事件时，重置addedSong
    $scope.$on("openLocal", function () {
      $scope.addedSong = {};
    })
  });
