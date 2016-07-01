/**
 * Created by 87676 on 2016/6/28.
 */
window.ucai = window.ucai || {};
(function () {
    function RadiusChanger(maxWith,maxHeight,startX,startY,p,img) {
        this.arc=new ucai.ShowedArc(maxWith,maxHeight,startX,startY,p);
        this.min=((maxHeight<maxWith)?maxHeight:maxWith)/2 ;
        this.g = p;
        this.canvas = this.g.canvas;
        this.addListeners();
        this.img=img;
        this.context200=document.getElementById("sculpture200").getContext("2d");
        this.context100=document.getElementById("sculpture100").getContext("2d");
        this.context50=document.getElementById("sculpture50").getContext("2d");

    }
    RadiusChanger.prototype.showClip=function (context,size,cycle) {
        context.clearRect(0,0,800,600);
        context.canvas.width="800";
        context.canvas.height="600";
        context.save();
        if(cycle){
            context.beginPath();
            context.arc(this.arc.PositionX,this.arc.PositionY,this.arc.Radius,0,Math.PI*2);
            context.closePath();
        }
        else{
            context.beginPath();
            context.rect(this.arc.PositionX-this.arc.Radius,this.arc.PositionY-this.arc.Radius,this.arc.Radius*2,this.arc.Radius*2);
            context.closePath();
        }
        context.fill();
        context.clip();
        context.drawImage(this.img,0,0,800,600);
        var imgData=context.getImageData(this.arc.PositionX-this.arc.Radius,this.arc.PositionY-this.arc.Radius,this.arc.Radius*2,this.arc.Radius*2);
        context.restore();
        context.clearRect(0,0,800,800);
        context.canvas.width=this.arc.Radius*2;
        context.canvas.height=this.arc.Radius*2;
        context.putImageData(imgData,0,0,0,0,this.arc.Radius*2,this.arc.Radius*2);
        context.canvas.style.transform="scale("+size/(this.arc.Radius*2)+")";
    };
    RadiusChanger.prototype.drawRing = function () {
        this.g.beginPath();
        this.g.arc(this.centerX, this.centerY, 4, 0, Math.PI * 2);
        this.g.fillStyle = "#fff";
        this.g.closePath();
        this.g.fill();
        this.showClip(this.context200,300,true);
        this.showClip(this.context100,200,true);
        this.showClip(this.context50,100,false);
    };
    RadiusChanger.prototype.addListeners = function () {
        var self = this;

        function changeCursor(event) {
            if (self.hitTest(event.layerX, event.layerY)) {
                event.target.style.cursor = "se-resize";
            }
        }

        function ringMouseMove(eve) {
            self.arc.Radius = Math.sqrt(Math.pow(Math.abs(eve.layerX - self.arc.PositionX), 2) +
                Math.pow(Math.abs(eve.layerY - self.arc.PositionY), 2) -
                Math.pow(Math.abs(eve.layerX - self.arc.PositionX), 2) +
                Math.pow(Math.abs(eve.layerY - self.arc.PositionY), 2), 2);
            (self.arc.Radius<100)?self.arc.Radius=100:null;
            (self.arc.Radius>self.min)?self.arc.Radius=self.min:null;
        }
        function ringMouseUp(event) {
            event.target.removeEventListener("mousemove", ringMouseMove);
        }

        function ringMouseDown(event) {
            if (self.hitTest(event.layerX, event.layerY)) {
                self.arc.Radius = Math.sqrt(Math.pow(Math.abs(event.layerX - self.arc.PositionX), 2) +
                    Math.pow(Math.abs(event.layerY - self.arc.PositionY), 2) -
                    Math.pow(Math.abs(event.layerX - self.arc.PositionX), 2) +
                    Math.pow(Math.abs(event.layerY - self.arc.PositionY), 2), 2);
                event.target.addEventListener("mousemove", ringMouseMove);
                event.target.addEventListener("mouseup", ringMouseUp);
            }
        }

        this.canvas.addEventListener("mousemove", changeCursor);
        this.canvas.addEventListener("mousedown", ringMouseDown);
    };
    RadiusChanger.prototype.hitTest = function (mouseX, mouseY) {
        var s = Math.sqrt(Math.pow(Math.abs(mouseX - this.centerX), 2) + Math.pow(Math.abs(mouseY - this.centerY), 2));
        return s < 6;
    };
    Object.defineProperties(RadiusChanger.prototype,{
        "centerX":{
            get:function () {
                return this.arc.PositionX + this.arc.Radius * Math.sqrt(2) / 2;
            }
        },
        "centerY":{
            get:function () {
                return this.arc.PositionY + this.arc.Radius * Math.sqrt(2) / 2;
            }
        }
    });
    ucai.RadiusChanger = RadiusChanger;
})();