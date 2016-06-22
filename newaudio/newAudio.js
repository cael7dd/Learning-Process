/**
 * Created by 87676 on 2016/6/20.
 */
window.audio=window.audio||{};
(function () {
    function CreateAudio(songName,songPath) {
        this.songName=songName;
        this.songPath=songPath;
        this.songPlayStyle=2;
        this.lastSongNumber=0;
    }
    CreateAudio.prototype=new audio.RunOnce();
    CreateAudio.prototype.getSong=function () {// 换歌需调用

        this._NodeAudioContainer.innerHTML="";
        this._NodeSong=document.createElement("audio");
        this._NodeSong.autoplay="autoplay";
        this._NodeSong.src=this.songPath[this.songNumber]+this.songName[this.songNumber]+".mp3";
        this._NodeAudioContainer.appendChild(this._NodeSong);
    };
    CreateAudio.prototype.getLrc=function () {
        var sLrc;
        $.get(this.songPath[this.songNumber]+this.songName[this.songNumber]+".lrc").done(function (data) {
            sLrc=data;
            this.init();
            var j=0;
            var sTime=[];
            for (var i = 1; i != -1;) {
                sTime[j] = sLrc.substring(i + 1, sLrc.indexOf("]"));//   strText未定义
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
            this.lrcTime=sTime;
        }.bind(this));

    };
    CreateAudio.prototype.eventNextSongFunc=function () {
        this._NodeNextSong.onclick=function () {
            this.lastSongNumber=this.songNumber;
            switch (this.songPlayStyle){
                case 0:this.eventRandomFunc();break;
                case 1:break;
                case 2:this.songNumber++;this.judgeSongNumber();break;
            }
            this.getLrc();
            console.log(this.songNumber);
        }.bind(this)
    };
    CreateAudio.prototype.eventLastSongFunc=function () {
        this._NodeLastSong.onclick=function () {
            this.songNumber--;
            this.judgeSongNumber();
            this.init();
        }.bind(this)
    };
    CreateAudio.prototype.addRandomFunc=function () {                         //添加随机功能事件
        this._NodeRandom.onclick=this.eventRandomFunc.bind(this);
    };
    CreateAudio.prototype.eventRandomFunc=function () {                       //随机功能实现函数
        this.songNumber=parseInt(Math.random()*(this.songName.length-1));
        if(this.songNumber==this.lastSongNumber){this.songNumber++}
        this.judgeSongNumber();
        this.songPlayStyle=0;
        this._NodeRandom.style.background="url(images/2.png) no-repeat -24px -300px";
        this._NodeOnlyOne.style.background="url(images/1.png) no-repeat -72px -1080px";
        this._NodeCycle.style.background="url(images/1.png) no-repeat -288px -1092px";
    };
    CreateAudio.prototype.judgeSongNumber=function () {              //判断将要播放的歌是否正确
        if(this.songNumber<0){
            this.songNumber=this.songName.length-1;
            return ;
        }
         if(this.songNumber==this.songName.length){
             this.songNumber=0;
         }
    };
    CreateAudio.prototype.addOnlyOneFunc=function () {                      //添加单曲循环功能事件
        this._NodeOnlyOne.onclick=function () {
            this.songPlayStyle=1;
            this._NodeRandom.style.background="url(images/1.png) no-repeat -72px -1104px";
            this._NodeOnlyOne.style.background="url(images/2.png) no-repeat -132px -228px";
            this._NodeCycle.style.background="url(images/1.png) no-repeat -288px -1092px";
        }.bind(this);
    };
    CreateAudio.prototype.addCycleFunc=function () {                        //添加列表循环功能事件
        this._NodeCycle.onclick=function () {
            this._NodeRandom.style.background="url(images/1.png) no-repeat -72px -1104px";
            this._NodeOnlyOne.style.background="url(images/1.png) no-repeat -72px -1080px";
            this._NodeCycle.style.background="url(images/2.png) no-repeat -72px -288px";
            this.songPlayStyle=2;
        }.bind(this);
    };           //TODO 进度条控制  定时器  时间显示

    CreateAudio.prototype.init=function () {  //换歌初始化
        this.getSong();
        this.lrc=[];
        this.lrcTime=[];
    };
    CreateAudio.prototype.getStart=function () {
        this.getHTML();
        this.addPLayFunc();
        this.getLrc();
        this.eventNextSongFunc();
        this.eventLastSongFunc();
        this.addRandomFunc();
        this.addOnlyOneFunc();
        this.addCycleFunc();

    };
    audio.createAudio=CreateAudio;
})();