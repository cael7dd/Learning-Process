/**
 * Created by 87676 on 2016/6/28.
 */
window.ucai=window.ucai||{};
(function () {
    function Main() {
        this.fps=document.getElementById("d_flash");
        this.currentTime=0;
        this._canvas=document.getElementById("canvas");
        this._context=this._canvas.getContext("2d");
        
        this.imgWidth=800;
        this.imgHeight=600;
        this.img=new ucai.ImageAdder(this.imgWidth,this.imgHeight,"1.jpg");
        this.cover=new ucai.Cover(this.imgWidth,this.imgHeight,"#fff",this._context,this.img.img);
       
        this.render();
    }
    Main.prototype.drewImg=function () {
        this._context.drawImage(this.img,0,0,this.imgWidth,this.imgHeight);
    };
    Main.prototype.render=function (time) {
        
        var dTime=time-this.currentTime;
        this.fps.innerHTML=(1000/dTime).toFixed(1)+"fps";
        this.currentTime=time;
        this._context.clearRect(0,0,this._canvas.width,this._canvas.height);
        this.img.drewImg(this._context);
        this.cover.drewCover(this._context);
        requestAnimationFrame(this.render.bind(this));
    };
    new Main();
})();