/**
 * Created by 87676 on 2016/6/19.
 */
window.audio = window.audio || {};
(function () {
    function CreatePlayer(source,strText) {
        this.source = source;
        this.getLyrics=function () {
            var time=[];
            var text=[];
            var j=0,k=0;
            for(var i=0;i!=-1;){
                time[j]=strText.substring(i+1,strText.indexOf("]"));
                strText=strText.substring(strText.indexOf("]")+1);
                text[j]=strText.substring(0,strText.indexOf("["));
                strText=strText.substring(strText.indexOf("["));
                i=strText.indexOf("[");
                j++;
                //console.log(strText);
            }
            text[j-1]=strText;
            //console.log(text[j-1]);
            for(i=0;i<time.length;i++){
                var minute=parseInt(time[i].substring(0,time[i].indexOf(":")));
                var second=parseInt(time[i].substring(time[i].indexOf(":")+1,time[i].indexOf(".")));
                var minSecond=parseInt(time[i].substring(time[i].indexOf(".")+1));
                time[i]=minute*60+second+minSecond/100;
                var textAlign=document.createElement("div");
                textAlign.className="lyricsLines";
                textAlign.innerHTML=text[i];
                this.lyricsTextContainer.appendChild(textAlign);
            }
            this.lyricsText=text;
            this.lyricsTime=time;
        };
        this.getHTML = function () {
            var str = "<audio id=\"song\"  src=\"" + this.source + "\"></audio>" +
                "<div id=\"d_container\">" + "<div id=\"d_controls\">" + "<div id=\"d_play\"></div>" +
                "<div id=\"d_progressContainer\">" + "<div id=\"d_songName\"></div>" +
                "<div id=\"d_progress\">" + "<div id=\"d_pointer\"></div>" + "<div id=\"d_played\"></div>" +
                "</div>" + "<div id=\"d_time\"></div>" + "</div>" + "<div id=\"d_volumeContainer\">" +
                "<div id=\"d_horn\"></div>" + "<div id=\"d_volume\">" + "<div id=\"d_volumePointer\"></div>" +
                "</div></div> </div> <div id=\"d_lyrics\"><div id='d_lyricsText'></div></div> </div>";
            document.body.innerHTML = str;
            this.song = document.getElementById("song");
            this.songprogress = document.getElementById("d_progress");
            this.songpointer = document.getElementById("d_pointer");
            this.btnplay = document.getElementById("d_play");
            this.songname = document.getElementById("d_songName");
            this.played = document.getElementById("d_played");
            this.time = document.getElementById("d_time");
            this.songprogressLength=parseInt(getComputedStyle(this.songprogress).width);//
            this.songprogressPoi=this.songprogress.getBoundingClientRect();
            this.horn = document.getElementById("d_horn");
            this.volumeprocress = document.getElementById("d_volume");
            this.volumepointer = document.getElementById("d_volumePointer");
            this.volumeLength=parseInt(getComputedStyle(this.volumeprocress).width);
            this.volumePoi=this.volumeprocress.getBoundingClientRect();
            this.lyricsTextContainer=document.getElementById("d_lyricsText");
            this.lyricsCount=1;
            this.lyricsLast=0;
        };
        this.play = false;
        this.addBtnPlayFun = function (event) {                         //给播放键添加事件
            if (this.play) {
                this.btnplay.style.background = "url(images/1.png)";
                this.play = false;
                this.song.pause();
                clearInterval(this.changetimeid);
            }
            else {
                this.btnplay.style.background = "url(images/2.png)";
                this.play = true;
                this.song.play();
                this.changetime();
            }
        };
        this.timecount = 0;                                               //记录setInterval的次数
        this.changetime = function () {
            this.timelength =this.songprogressLength / this.song.duration;//setInterval 刷新时间 进度条 进度球  已放进度  未完成 歌词刷新
            this.dragProgressBall();
            var that = this;
            var time=[],changeTime2=4;
            this.lyricsLines=document.getElementsByClassName("lyricsLines");
            time[2]=parseInt(that.song.duration / 60);
            time[3]=parseInt(that.song.duration) - parseInt(that.song.duration / 60) * 60;
            this.changetimeid = setInterval(function () {
                if(that.timecount>=that.song.duration){that.timecount=0;clearInterval(that.changetimeid);that.lyricsCount=0;}
                if(that.lyricsTime[that.lyricsCount]<=that.timecount){
                    that.lyricsTextContainer.style.top=200-20*that.lyricsCount+"px";
                    that.lyricsLast=that.lyricsCount;
                    that.lyricsLines[that.lyricsCount-1].id=null;
                    that.lyricsLines[that.lyricsCount++].id="d_lyricsNow";
                }
                time[0]=parseInt(that.song.currentTime / 60);
                time[1]=parseInt(that.song.currentTime) - parseInt(that.song.currentTime / 60) * 60;
                that.movedLength = that.timelength * that.timecount;
                that.songpointer.style.left = that.movedLength - 8 + "px";
                that.timecount++;
                that.played.style.width = that.movedLength + "px";
                for (var i = 0; i < changeTime2; i++) {
                    if (!Math.floor(time[i] / 10)) {
                        time[i] = "0" + time[i];
                    }
                }
                that.time.innerHTML = time[0] + ":" + time[1] + "/" + time[2] + ":" + time[3];
                changeTime2=2;
            }, 1000);
        };
        this.dragProgressBall=function () {
            var that=this;
            var mDown=false;
            var time=[],changeTime2=4;
            time[2]=parseInt(that.song.duration / 60);
            time[3]=parseInt(that.song.duration) - parseInt(that.song.duration / 60) * 60;
                function songProgressUp() {
                    if(mDown){
                        this.song.currentTime=that.timecount;
                        mDown=false;
                        for(var i=0;i<this.lyricsTime.length;i++){
                            if(this.lyricsTime[i]<=this.timecount&&this.lyricsTime[i+1]>this.timecount){
                                this.lyricsCount=i;
                                this.lyricsLines[this.lyricsLast].id=null;
                                this.lyricsLast=i;
                                this.lyricsTextContainer.style.top=200-20*this.lyricsCount+"px";
                                this.lyricsLines[this.lyricsCount++].id="d_lyricsNow";
                                break;
                            }
                        }
                    }
                window.onmousemove=null;
            }
            window.onmouseup=songProgressUp.bind(this);
            function songProgressStyle(event) {//可扩展 歌词同步
                var left=event.clientX-that.songprogressPoi.left;
                time[0]=parseInt(that.timecount / 60);
                time[1]=that.timecount - parseInt(that.timecount / 60) * 60;
                (left<0)?left=0:((left>that.songprogressLength)?left=that.songprogressLength : null);
                that.timecount=parseInt(left/that.timelength);
                that.songpointer.style.left=-8+left+"px";
                that.played.style.width = left + "px";
                for (var i = 0; i < changeTime2; i++) {
                    if (!Math.floor(time[i] / 10)) {
                        time[i] = "0" + time[i];
                    }
                }
                that.time.innerHTML = time[0] + ":" + time[1] + "/" + time[2] + ":" + time[3];
                changeTime2=2;
            }
            function songProgressDown(event) {
                mDown=true;
                songProgressStyle(event);
                window.onmousemove=songProgressStyle;
            }
           that.songprogress.onmousedown=songProgressDown;
        };
        this.addHornFun = function () {                                  //静音键添加功能
            function hornClicked(event) {
                if (this.song.muted) {
                    this.song.muted = false;
                    this.horn.style.background = "url(images/3.png)";
                    this.volumepointer.style.left=-6+this.volumeLength*this.song.volume+"px";
                }
                else {
                    this.horn.style.background = "url(images/4.png)";
                    this.volumepointer.style.left = "-6px";
                    this.song.muted = true;
                }
            }
            this.horn.addEventListener("click", hornClicked.bind(this));
        };
        this.changeVolume = function () {                                                 //实现音量球拖拽
            this.volumeprocress.addEventListener("mousedown", volumeProcessDown.bind(this));
            window.addEventListener("mouseup",function (event) {                        //鼠标抬起 mousemove事件失效
                window.onmousemove=null;
            });
            function volumeProcessMove(event) {
                var left = event.clientX - this.volumePoi.left;
                (left<0)?left=0:((event.clientX>this.volumePoi.right)?left=this.volumeLength:null);
                this.volumepointer.style.left = -6 + left + "px";
                this.song.volume = left / this.volumeLength;
                judegeVol.call(this);
            }
            function judegeVol() {
                if (this.song.volume > 0) {
                    this.song.muted =false;
                    this.horn.style.background = "url(images/3.png)";
                }
                else{
                    this.song.muted=true;
                    this.horn.style.background = "url(images/4.png)";
                }
            }
            function volumeProcessDown(event) {
                var left = event.clientX - this.volumePoi.left;
                (left<0)? left=0:((event.clientX>this.volumePoi.right)?left=this.volumeLength:null);
                this.volumepointer.style.left = -6 + left + "px";
                this.song.volume = left / this.volumeLength;
                judegeVol.bind(this);
                window.onmousemove=volumeProcessMove.bind(this);
            }
        };
        this.init = function () {                                                       //初始化
            this.btnplay.addEventListener("click", this.addBtnPlayFun.bind(this));
            this.getLyrics();
            this.addHornFun();
            this.changeVolume();
            var name = this.source;
            name = name.substring(name.lastIndexOf("/") + 1, name.lastIndexOf("."));
            this.songname.innerHTML = name;
        };
    }
    window.audio.CreatePlayer = CreatePlayer;
})();