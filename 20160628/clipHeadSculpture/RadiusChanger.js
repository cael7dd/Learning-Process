/**
 * Created by 87676 on 2016/6/28.
 */
window.ucai = window.ucai || {};
(function () {
    function RadiusChanger(maxWith,maxHeight,startX,startY,p) {
        this.arc=new ucai.ShowedArc(maxWith,maxHeight,startX,startY,p);
        this.min=((maxHeight<maxWith)?maxHeight:maxWith)/2 ;
        this.g = p;
        this.canvas = this.g.canvas;
        this.addListeners();
    }
    RadiusChanger.prototype.drawRing = function () {
        this.g.beginPath();
        this.g.arc(this.centerX, this.centerY, 4, 0, Math.PI * 2);
        this.g.fillStyle = "#fff";
        this.g.closePath();
        this.g.fill();
    };
    RadiusChanger.prototype.addListeners = function () {
        var self = this;

        function changeCursor(event) {
            if (self.hitTest(event.layerX, event.layerY)) {
                event.target.style.cursor = "se-resize";
            } else event.target.style.cursor = "default";
        }

        function ringMouseMove(eve) {
            self.arc.Radius = Math.sqrt(Math.pow(Math.abs(eve.layerX - self.arc.PositionX), 2) +
                Math.pow(Math.abs(eve.layerY - self.arc.PositionY), 2) -
                Math.pow(Math.abs(eve.layerX - self.arc.PositionX), 2) +
                Math.pow(Math.abs(eve.layerY - self.arc.PositionY), 2), 2);
            (self.arc.Radius<30)?self.arc.Radius=30:null;
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
        return s < 4;
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