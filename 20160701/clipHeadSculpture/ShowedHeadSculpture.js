/**
 * Created by 87676 on 2016/7/1.
 */
window.ucai=window.ucai||{};
(function () {
    function ShowedHeadSculpture(context,poiX,poiY,radius,cycle,size) {
        this.context=context;
        this.poiX=poiX;
        this.poiY=poiY;
        this.Radius=radius;
        this.cycle=cycle;
        this.size=size;
        this.context.scale(this.size/(this.Radius*2),this.size/(this.Radius*2));
    }
    ShowedHeadSculpture.prototype.clipPic=function (img) {
        this.context.save();
        this.context.drawImage(img,0,0);
        if(this.cycle){
            this.context.arc(this.poiX,this.poiY,this.Radius,0,Math.PI*2);
        }
        else{
            this.context.beginPath();
            this.context.rect(this.poiX-this.Radius,this.poiY-this.Radius,this.Radius*2,this.Radius*2);
            this.context.closePath();
        }
        this.context.fill();
        this.context.clip();
        this.context.restore();
    };
    ucai.ShowedHeadSculpture=ShowedHeadSculpture;
})();