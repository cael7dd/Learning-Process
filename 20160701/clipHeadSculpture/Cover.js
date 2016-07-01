/**
 * Created by 87676 on 2016/6/28.
 */
window.ucai=window.ucai||{};
(function () {
    function Cover(width,height,color,p,img) {
        this.width=width;
        this.height=height;
        this.color=color;
        this.ring=new ucai.RadiusChanger(this.width,this.height,0,0,p,img);
    }
    Cover.prototype.drewCover=function (g) {
        g.save();
        g.globalAlpha=0.5;
        g.fillStyle=this.color;
        g.beginPath();
        g.rect(0,0,this.width,this.height);
        this.ring.arc.drewShowedArc();
        g.fill();
        g.closePath();
        g.restore();
        this.ring.drawRing();
    };
    ucai.Cover=Cover;
})();