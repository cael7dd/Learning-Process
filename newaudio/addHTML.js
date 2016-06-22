/**
 * Created by 87676 on 2016/6/21.
 */
window.audio=window.audio||{};
(function () {
    function RunOnce() {
        this.play=true;
        this.songNumber=0;
    }
    RunOnce.prototype.getHTML=function () {
        document.body.innerHTML= "<div id=\"d_container\">"+
            "<div id=\"d_controls\">"+
            " <div id=\"d_controlBtn\">"+
            " <div id=\"d_last\"></div>"+
            " <div id=\"d_play\"></div>"+
            " <div id=\"d_next\"></div>"+
            "   </div>"+
            "   <div id=\"d_progressContainer\">"+
            "   <div id=\"d_songName\"></div>"+
            "<div id=\"d_playStyle\">"+
            "   <div class=\"d_playStyleBtn\" id=\"d_random\"></div>"+
            "   <div class=\"d_playStyleBtn\" id=\"d_onlyOne\"></div>"+
            "   <div class=\"d_playStyleBtn\" id=\"d_cycle\"></div>"+
            "   </div>"+
            "   <div id=\"d_progress\">"+
            "   <div id=\"d_pointer\"></div>"+
            "   </div>"+
            "   <div id=\"d_time\"></div>"+
            "</div>"+
            "<div id=\"d_volumeContainer\">"+
            "    <div id=\"d_horn\"></div>"+
            "   <div id=\"d_volume\">"+
            "   <div id=\"d_volumePointer\"></div>"+
            "   </div>"+
            "   </div>"+
            "   </div>"+
            "   <div id=\"d_lyrics\">"+
            "   <div id=\"d_lyricsText\"></div>"+
            "   </div>"+
            "   </div><div id='d_audio'></div>";
        this._NodeAudioContainer=document.getElementById("d_audio");
        this._NodeLastSong=document.getElementById("d_last");
        this._NodePlay=document.getElementById("d_play");
        this._NodeNextSong=document.getElementById("d_next");
        this._NodeSongName=document.getElementById("d_songName");
        this._NodeRandom=document.getElementById("d_random");
        this._NodeOnlyOne=document.getElementById("d_onlyOne");
        this._NodeCycle=document.getElementById("d_cycle");
        this._NodeProgress=document.getElementById("d_progress");
        this._NodePointer=document.getElementById("d_pointer");
        this._NodeTime=document.getElementById("d_time");
        this._NodeHorn=document.getElementById("d_horn");
        this._NodeVolumeProgress=document.getElementById("d_volume");
        this._NodeVolumePointer=document.getElementById("d_volumePointer");
        this._NodeLyricsContainer=document.getElementById("d_lyricsText");
    }
    RunOnce.prototype.addPLayFunc=function () {
        this._NodePlay.onclick=this.eventPlayFunc.bind(this);
    };//为播放键添加事件
    RunOnce.prototype.eventPlayFunc=function () {
        if(this.play){
            this.play=false;
            this._NodePlay.style.background="url(\"images/1.png\") no-repeat -192px -144px";
            this._NodeSong.pause();
        }
        else{
            this.play=true;
            this._NodePlay.style.background="url(\"images/1.png\") no-repeat -446px -276px";
            this._NodeSong.play();
        }
    };//播放键事件调用的函数
    
    audio.RunOnce=RunOnce;
})();