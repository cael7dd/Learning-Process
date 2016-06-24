/**
 * Created by 87676 on 2016/6/21.
 */
window.audio = window.audio || {};
(function () {
    function BtnControl(songName, songPath) {
        this.play = true;
        this.songNumber = 0;
        this.songName = songName;
        this.songPath = songPath;
        this.songPlayStyle = 2;
        this.lastSongNumber = 0;
    }
    BtnControl.prototype.getHTML = function () {
        document.body.innerHTML = "<div id=\"d_container\">" +
            "<div id=\"d_controls\">" +
            " <div id=\"d_controlBtn\">" +
            " <div id=\"d_last\"></div>" +
            " <div id=\"d_play\"></div>" +
            " <div id=\"d_next\"></div>" +
            "   </div>" +
            "   <div id=\"d_progressContainer\">" +
            "   <div id=\"d_songName\"></div>" +
            "<div id=\"d_playStyle\">" +
            "   <div class=\"d_playStyleBtn\" id=\"d_random\"></div>" +
            "   <div class=\"d_playStyleBtn\" id=\"d_onlyOne\"></div>" +
            "   <div class=\"d_playStyleBtn\" id=\"d_cycle\"></div>" +
            "   </div>" +
            "   <div id=\"d_progress\">" +
            "   <div id=\"d_pointer\"></div>" +
            "<div id='d_played'></div>" +
            "   </div>" +
            "   <div id=\"d_time\"></div>" +
            "</div>" +
            "<div id=\"d_volumeContainer\">" +
            "    <div id=\"d_horn\"></div>" +
            "   <div id=\"d_volume\">" +
            "   <div id=\"d_volumePointer\"></div>" +
            "   </div>" +
            "   </div>" +
            "   </div>" +
            "   <div id=\"d_lyrics\">" +
            "   <div id=\"d_lyricsText\"></div>" +
            "   </div>" +
            "   </div><div id='d_audio'></div>";
        this._NodeAudioContainer = document.getElementById("d_audio");
        this._NodeLastSong = document.getElementById("d_last");
        this._NodePlay = document.getElementById("d_play");
        this._NodeNextSong = document.getElementById("d_next");
        this._NodeSongName = document.getElementById("d_songName");
        this._NodeRandom = document.getElementById("d_random");
        this._NodeOnlyOne = document.getElementById("d_onlyOne");
        this._NodeCycle = document.getElementById("d_cycle");
        this._NodeProgress = document.getElementById("d_progress");
        this._NodePointer = document.getElementById("d_pointer");
        this._NodePlayed = document.getElementById("d_played");
        this._NodeTime = document.getElementById("d_time");
        this._NodeHorn = document.getElementById("d_horn");
        this._NodeVolumeProgress = document.getElementById("d_volume");
        this._NodeVolumePointer = document.getElementById("d_volumePointer");
        this._NodeLyricsContainer = document.getElementById("d_lyricsText");
        this.progressLength = parseInt(getComputedStyle(this._NodeProgress).width);
        this.progressPosition=this._NodeProgress.getBoundingClientRect();
        this.volumeProgressLength=parseInt(getComputedStyle(this._NodeVolumeProgress).width);
        this.volumeProgressPosition=this._NodeVolumeProgress.getBoundingClientRect();
    };
    BtnControl.prototype.getSong = function () {// 换歌需调用
        this._NodeAudioContainer.innerHTML = "";
        this._NodeSong = document.createElement("audio");
        if(this.play){
            this._NodeSong.autoplay = "autoplay";
        }

        this._NodeSong.src = this.songPath[this.songNumber] + this.songName[this.songNumber] + ".mp3";
        this._NodeAudioContainer.appendChild(this._NodeSong);
        this._NodeSongName.innerHTML=this.songName[this.songNumber];
    };
    BtnControl.prototype.getLrc = function () {
        this.lrc=[];
        this.lrcTime=[];
        this.getSong();
        var sLrc;
        $.get(this.songPath[this.songNumber] + this.songName[this.songNumber] + ".lrc").done(function (data) {
            sLrc = data;
            var j = 0;
            var sTime = [];
            for (var i = 1; i != -1;) {
                sTime[j] = sLrc.substring(i + 1, sLrc.indexOf("]"));
                sLrc = sLrc.substring(sLrc.indexOf("]") + 1);
                this.lrc[j] = sLrc.substring(0, sLrc.indexOf("["));
                sLrc = sLrc.substring(sLrc.indexOf("["));
                i = sLrc.indexOf("[");
                j++;
            }
            this.lrc[j - 1] = sLrc;
            for (i = 0; i < sTime.length; i++) {
                var minute = parseInt(sTime[i].substring(0, sTime[i].indexOf(":")));
                var second = parseInt(sTime[i].substring(sTime[i].indexOf(":") + 1, sTime[i].indexOf(".")));
                var minSecond = parseInt(sTime[i].substring(sTime[i].indexOf(".") + 1));
                sTime[i] = minute * 60 + second + minSecond / 100;
            }
            this.lrcTime = sTime;
            this.intervalCount=0;
            clearInterval(this.intervalMin);
            this.addIntervalMin();
            this._NodeLyricsContainer.innerHTML="";
            setTimeout(function () {
                this.progressStepLength=this.progressLength/this._NodeSong.duration;
            }.bind(this),900);
            this.addLrc();
        }.bind(this));

    };
    
    BtnControl.prototype.eventNextSongFunc = function () {
        this._NodeNextSong.onclick = this.judgeNextSong.bind(this)
    };
    BtnControl.prototype.judgeNextSong=function () {
        this.lastSongNumber = this.songNumber;
        switch (this.songPlayStyle) {
            case 0:
                this.eventRandomFunc();
                break;
            case 1:
                break;
            case 2:
                this.songNumber++;
                this.judgeSongNumber();
                break;
        }
        this.getLrc();
    };
    BtnControl.prototype.eventLastSongFunc = function () {
        this._NodeLastSong.onclick = function () {
            this.songNumber--;
            this.judgeSongNumber();
            this.getLrc();
        }.bind(this)
    };
    BtnControl.prototype.addRandomFunc = function () {                         //添加随机功能事件
        this._NodeRandom.onclick = this.eventRandomFunc.bind(this);
    };
    BtnControl.prototype.eventRandomFunc = function () {                       //随机功能实现函数
        this.songNumber = parseInt(Math.random() * (this.songName.length - 1));
        if (this.songNumber == this.lastSongNumber) {
            this.songNumber++
        }
        this.judgeSongNumber();
        this.songPlayStyle = 0;
        this._NodeRandom.style.background = "url(images/2.png) no-repeat -24px -300px";
        this._NodeOnlyOne.style.background = "url(images/1.png) no-repeat -72px -1080px";
        this._NodeCycle.style.background = "url(images/1.png) no-repeat -288px -1092px";
    };
    BtnControl.prototype.judgeSongNumber = function () {                       //判断将要播放的歌是否正确
        if (this.songNumber < 0) {
            this.songNumber = this.songName.length - 1;
            return;
        }
        if (this.songNumber == this.songName.length) {
            this.songNumber = 0;
        }
    };
    BtnControl.prototype.addOnlyOneFunc = function () {                      //添加单曲循环功能事件
        this._NodeOnlyOne.onclick = function () {
            this.songPlayStyle = 1;
            this._NodeRandom.style.background = "url(images/1.png) no-repeat -72px -1104px";
            this._NodeOnlyOne.style.background = "url(images/2.png) no-repeat -132px -228px";
            this._NodeCycle.style.background = "url(images/1.png) no-repeat -288px -1092px";
        }.bind(this);
    };
    BtnControl.prototype.addCycleFunc = function () {                        //添加列表循环功能事件
        this._NodeCycle.onclick = function () {
            this._NodeRandom.style.background = "url(images/1.png) no-repeat -72px -1104px";
            this._NodeOnlyOne.style.background = "url(images/1.png) no-repeat -72px -1080px";
            this._NodeCycle.style.background = "url(images/2.png) no-repeat -72px -288px";
            this.songPlayStyle = 2;
        }.bind(this);
    };
    BtnControl.prototype.addHornClick=function () {
        this._NodeHorn.onclick=function () {
            if(this._NodeSong.muted){
                this._NodeHorn.style.background="url(\"images/1.png\") no-repeat -240px -1080px";
                this._NodeSong.muted=false;
                this._NodeVolumePointer.style.left=this._NodeSong.volume*this.volumeProgressLength-6+"px";
            }
            else{
                this._NodeHorn.style.background="url(images/3.png) no-repeat -96px -456px";
                this._NodeSong.muted=true;
                this._NodeVolumePointer.style.left="-6px";
            }
        }.bind(this);
    };
    BtnControl.prototype.volumePointerDrag=function () {
        this._NodeVolumeProgress.onmousedown=function (event) {
            this.eventVolumePointerDrag(event);
            window.onmousemove=function (event) {
                this.eventVolumePointerDrag(event);
            }.bind(this);

            window.onmouseup=function () {
                window.onmouseup="";
                window.onmousemove="";
            };
        }.bind(this);
    };
    BtnControl.prototype.eventVolumePointerDrag=function (event) {
        this.volumeLeft=event.clientX-this.volumeProgressPosition.left;
        this.volumePointerPositionJudge();
        this._NodeVolumePointer.style.left=this.volumeLeft-6+"px";
        this._NodeSong.volume=this.volumeLeft/this.volumeProgressLength;
        console.log(this.volumeLeft);
    };
    BtnControl.prototype.volumePointerPositionJudge=function () {
        this._NodeHorn.style.background="url(\"images/1.png\") no-repeat -240px -1080px";
        if(this.volumeLeft>this.volumeProgressLength){
            this.volumeLeft=this.volumeProgressLength;

            return ;
        }
        if(this.volumeLeft<0){
            this.volumeLeft=0;
            this._NodeHorn.style.background="url(images/3.png) no-repeat -96px -456px";
        }
    };
    audio.BtnControl = BtnControl;
})();