/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai=window.ucai||{};
(function () {
    function Main() {
        this._canvas=document.getElementById("canvas");
        this._context=this._canvas.getContext("2d");
        this._video=document.createElement("video");
        this._div=document.getElementById("div");
        this.currentTime=0;
        this._video.src="1.mp4";
        this._video.autoplay="autoplay";
        this._videoWidth=711;
        this._videoHeight=400;
        this.render();
    }
    Main.prototype.createBlack=function () {
        var origin=this._context.getImageData(0,0,this._videoWidth,this._videoHeight);
        var black=this._context.createImageData(this._videoWidth,this._videoHeight);
        for(var i=0;i<origin.data.length;i+=4){
            var s=(origin.data[i]+origin.data[i+1]+origin.data[i+2])/3;
            black.data[i]=black.data[i+1]=black.data[i+2]=s;
            black.data[i+3]=origin.data[3];
        }
        this._context.putImageData(black,0,0,0,0,this._videoWidth,this._videoHeight);
    };
    Main.prototype.createWhatever=function (num,x,y) {
        var origin=this._context.getImageData(0,0,this._videoWidth,this._videoHeight);
        var whatever=this._context.createImageData(this._videoWidth,this._videoHeight);
        for(var i=0;i<origin.data.length;i+=4){
            whatever.data[i]=whatever.data[i+1]=whatever.data[i+2]=0;
            whatever.data[i+3]=origin.data[3];
            whatever.data[i+num]=origin.data[i+num];
        }
        this._context.putImageData(whatever,x,y,0,0,this._videoWidth,this._videoHeight);

    };
    Main.prototype.render=function (time) {
        var d=time-this.currentTime;
        this._div.innerHTML=Math.round(1000/d)+"fps";
        this.currentTime=time;
        this._context.drawImage(this._video,0,0,this._videoWidth,this._videoHeight);
        this.createBlack();
        this.createWhatever(0,this._videoWidth,0);
        this.createWhatever(1,0,this._videoHeight);
        this.createWhatever(2,this._videoWidth,this._videoHeight);
        requestAnimationFrame(this.render.bind(this));
    };
    new Main();
})();