/**
 * Created by 87676 on 2016/6/28.
 */
window.ucai=window.ucai||{};
(function () {
    function ImageAdder(width,height,path) {
        this.img=new Image();
        this.img.src=path;
        this.width=width;
        this.height=height;
    }
    ImageAdder.prototype.drewImg=function (g) {
        g.drawImage(this.img,0,0,this.width,this.height);
    };
    ucai.ImageAdder=ImageAdder;
})();