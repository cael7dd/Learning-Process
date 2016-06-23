/**
 * Created by 87676 on 2016/6/20.
 */
window.audio = window.audio || {};
(function () {
    function CreateAudio(sourceName, sourcePath) {
        audio.BtnControl.call(this, sourceName, sourcePath);
    }

    CreateAudio.prototype = new audio.BtnControl();
    CreateAudio.prototype.addPLayFunc = function () {                 //为播放键添加事件
        this._NodePlay.onclick = this.eventPlayFunc.bind(this);
    };
    CreateAudio.prototype.eventPlayFunc = function () {               //播放键事件调用的函数
        if (this.play) {
            this.play = false;
            this._NodePlay.style.background = "url(\"images/1.png\") no-repeat -192px -144px";
            this._NodeSong.pause();
            this._NodePointer.style.animation = "null";
            clearInterval(this.intervalMin);
        }
        else {
            this.play = true;
            this._NodePlay.style.background = "url(\"images/1.png\") no-repeat -446px -276px";
            this._NodeSong.play();
            this.addIntervalMin();
            this._NodePointer.style.animation = "pointerShining 1s infinite alternate";
            this.intervalFunc();
        }
    };
    CreateAudio.prototype.changeProgressPointerLeft = function () {               //根据progressLeft修改Pointer的left值
        this._NodePointer.style.left = this.progressPointerLeft() - 8 + "px";
    };
    CreateAudio.prototype.changePlayedWidth = function () {               //根据progressLeft修改Played的宽度值
        this._NodePlayed.style.width = this.progressPointerLeft() + "px";
    };
    CreateAudio.prototype.addIntervalMin = function () {                   //添加计时器
        this.intervalMin = setInterval(function () {
            this.intervalFunc();

        }.bind(this), 1000);
    };
    CreateAudio.prototype.intervalFunc = function () {                   //计时器功能实现函数
        if (this.intervalCount > this._NodeSong.duration - 1 && this.intervalCount <= this._NodeSong.duration) {
            this.judgeNextSong();
        }
        this.changeProgressPointerLeft();
        this.changePlayedWidth();
        this.changeNodeTime.call(this);
        this.intervalCount = this._NodeSong.currentTime;
        if (this.intervalCount >= this.lrcTime[this.lrcNumber]) {
            this._NodeLyricsContainer.style.top = -this.lrcNumber * 22 + 200 + "px";
            this.lrcLines[this.lastLrcNumber].id = "null";
            this.lrcLines[this.lrcNumber].id = "d_lyricsNow";
            this.lastLrcNumber = this.lrcNumber;
            this.lrcNumber++;
        }
    };
    CreateAudio.prototype.changeNodeTime = function () {                   //改变右侧时间显示
        var time = [];
        time[0] = parseInt(this.intervalCount / 60);
        time[1] = parseInt(this.intervalCount - time[0] * 60);
        time[2] = parseInt(this._NodeSong.duration / 60);
        time[3] = parseInt(this._NodeSong.duration - time[2] * 60);
        for (var i = 0; i < time.length; i++) {
            if (!parseInt(time[i] / 10)) {
                time[i] = "0" + time[i];
            }
        }
        this._NodeTime.innerHTML = time[0] + ":" + time[1] + "/" + time[2] + ":" + time[3];
    };
    CreateAudio.prototype.addPointerDrag = function () {                   //添加Pointer拖拽功能

        this._NodeProgress.onmousedown = function (event) {
            this.eventMouseDownChange.call(this, event);
            window.onmousemove = this.eventMouseDownChange.bind(this);
            window.onmouseup = function () {
                window.onmousemove = "";
                window.onmouseup = "";
                this._NodeSong.currentTime = this.tempTime;
                this.intervalCount = this.tempTime;
                if (this.play) {
                    this.addIntervalMin();
                }
                for(var i=1;i<this.lrcTime.length;i++){
                    if(this.intervalCount <= this.lrcTime[i] && this.lrcTime[i-1] < this.intervalCount){
                        this.lrcNumber=i;
                        this._NodeLyricsContainer.style.top =-this.lrcNumber * 22 + 200 + "px";
                        this.lrcLines[this.lastLrcNumber].id = "null";
                        this.lrcLines[this.lrcNumber].id = "d_lyricsNow";
                        this.lastLrcNumber = this.lrcNumber;
                        break;
                    }
                }
            }.bind(this);
        }.bind(this);
    };
    CreateAudio.prototype.eventMouseDownChange = function (event) {                   //拖拽功能实现函数
        var left = event.clientX - this.progressPosition.left;
        if (left < 0) {
            left = 0;
        }
        if (left > this.progressLength) {
            left = this.progressLength;
        }
        this._NodePointer.style.left = left - 8 + "px";
        this._NodePlayed.style.width = left + "px";
        if (this.play) {
            clearInterval(this.intervalMin);
        }
        this.tempTime = this.intervalCount;
        this.intervalCount = left / this.progressLength * this._NodeSong.duration;
        this.changeNodeTime();
        this.intervalCount = this.tempTime;
        this.tempTime = left / this.progressLength * this._NodeSong.duration;

    };
    CreateAudio.prototype.addLrc = function () {                   //动态显示歌词
        for (var i = 0; i < this.lrcTime.length; i++) {
            var lrcLine = document.createElement("div");
            lrcLine.className = "d_lrcLine";
            lrcLine.innerHTML = this.lrc[i];
            this._NodeLyricsContainer.appendChild(lrcLine);
        }
        this._NodeLyricsContainer.style.top="200px";
        this.lrcLines = document.getElementsByClassName("d_lrcLine");
        this.lrcNumber = 1;
        this.lastLrcNumber = 1;
    };
    CreateAudio.prototype.getStart = function () {                   //开始函数
        this.getHTML();
        this.progressPointerLeft = function () {
            return this.progressStepLength * this.intervalCount;
        };
        this.addPLayFunc();
        this.getLrc();
        this.eventNextSongFunc();
        this.eventLastSongFunc();
        this.addRandomFunc();
        this.addOnlyOneFunc();
        this.addCycleFunc();
        this.addPointerDrag();
        this.addHornClick();
        this.volumePointerDrag();
    };
    audio.createAudio = CreateAudio;
})();