/**
 * Created by 87676 on 8/25/2016.
 */
angular.module("app.getData", [])
  .factory("GetData", function ($q, httpGetRequest) {
    function getSearchData(text, page) {
      page = page || 1;
      var delay = $q.defer();
      httpGetRequest.getRequest("http://apis.baidu.com/geekery/music/query?s=" + text + "&page=" + page).then(function (data) {
        if (data.code == 0) {
          delay.resolve(data);
        } else {
          delay.reject();
        }
      });
      return delay.promise;
    }

    function getSongUrl(hash) {
      var delay = $q.defer();
      httpGetRequest.getRequest("http://apis.baidu.com/geekery/music/playinfo?hash=" + hash + "#").then(function (data) {
        delay.resolve(data);
      });
      return delay.promise;
    }

    function getSingerInfo(name) {
      var delay = $q.defer();
      httpGetRequest.getRequest("http://apis.baidu.com/geekery/music/singer?name=" + name + "#").then(function (data) {
        delay.resolve(data);
      });
      return delay.promise;
    }

    function getLRC(name, hash, time) {
      var delay = $q.defer();
      httpGetRequest.getRequest("http://apis.baidu.com/geekery/music/krc?name=" + name + "&hash=" + hash + "&time=" + time + "#").then(function (data) {
        delay.resolve(data);
      });
      return delay.promise;
    }

    return {
      getSearchData: getSearchData,
      getSongUrl: getSongUrl,
      getSingerInfo: getSingerInfo,
      getLRC: getLRC
    }
  })
  .factory("LocalList", function () {
    var localList = [];
    var removedList = [];
    var currentSong = 0;
    var isSingle=false;

    function addToList(obj) {
      if (localList.indexOf(obj) == -1) {
        localList.push(obj);
      }
    }

    function getLocalList() {
      return localList;
    }

    function getNextSong() {
      if(isSingle){
        return localList[currentSong];
      }
      if (currentSong < localList.length) {
        return localList[++currentSong];
      } else {
        currentSong = 0;
        return localList[currentSong++];
      }
    }
    function getLastSong() {
      if(isSingle){
        return localList[currentSong];
      }
      if (currentSong >0) {
        return localList[--currentSong];
      } else {
        currentSong = localList.length-1;
        return localList[currentSong];
      }
    }

    function removeIndexList(index) {
      removedList.push(localList[index]);
      if (removedList.length > 5) {
        removedList.shift();
      }
      localList.splice(index, 1);
      return localList;
    }

    function getRemovedList() {
      return removedList;
    }
    function changeMode(data) {
      isSingle=data;
    }

    return {
      addToList: addToList,
      getLocalList: getLocalList,
      removeIndexList: removeIndexList,
      getRemovedList: getRemovedList,
      getNextSong: getNextSong,
      getLastSong:getLastSong,
      changeMode:changeMode
    }
  })
  .factory("playingControl", function (GetData, LocalList, $interval, $q) {
    var audio = document.querySelector("#audio");
    var timeLength, song, singer;

    function playSong(data, obj) {
      if (data.code == 0) {
        timeLength = data.data.timeLength;
        song = data.data;
        song.songName = obj.songname;
        song.fileName = obj.filename;
        audio.src = song.url;
        //进度条初始化
        //添加完播放地址后执行播放命令
        audio.play();
      }
      var delay = $q.defer();
      GetData.getSingerInfo(obj.singername).then(function (data) {
        if (data.code == 0) {
          singer = data.data;
          delay.resolve(singer);
          detailInfo=null;
        }
      });
      return delay.promise;
    }
    var detailInfo;
    function getSongInfo() {
      var delay = $q.defer();
      if(!detailInfo){
        GetData.getLRC(song.fileName, song.hash.toLowerCase(), song.timeLength).then(function (data) {
          var lrc=[];
          var stringLrc=data.data.content;
          var p=/\[([^:]+):([^\.]+)\.([^\]]+)]([^\n]+)\n/g;
          while(true){
            var temp=p.exec(stringLrc);
            if(!temp){
              break;
            }
            var timeStamp=parseInt(temp[1])*600+parseInt(temp[2])*10+Math.round(parseInt(temp[3])/10);
            lrc.push({timeStamp:timeStamp,word:temp[4]});
          }
          detailInfo={
            songName: song.fileName,
            duration: song.timeLength,
            singerName: singer.singername,
            singerImg: singer.image,
            lrc: lrc
          };
          delay.resolve(detailInfo);
        });
      }else{
        delay.resolve(detailInfo);
      }
      return delay.promise;
    }

    return {
      playSong: playSong,
      getSongInfo: getSongInfo
    }
  });
