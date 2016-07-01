/**
 * Created by 87676 on 2016/6/28.
 */
window.ucai = window.ucai || {};
(function () {
    function ShowedArc(maxWith, maxHeight, startX, startY, p) {
        this.maxWidth = maxWith;
        this.maxHeight = maxHeight;
        this.startX = startX;
        this.startY = startY;
        this.p = p;
        this.canvas = this.p.canvas;
        this.poiX = this.startX + this.maxWidth / 2;
        this.poiY = this.startY + this.maxHeight / 2;
        this.radio = 200;
       
        this.addListeners();
    }
    Object.defineProperties(ShowedArc.prototype, {
        PositionX: {
            get: function () {
                return this.poiX;
            }
        },
        PositionY: {
            get: function () {
                return this.poiY;
            }
        },
        Radius: {
            get: function () {
                return this.radio;
            },
            set: function (value) {
                this.radio = value;
            }
        }
    });
    ShowedArc.prototype.drewShowedArc = function () {
        this.p.arc(this.poiX, this.poiY, this.radio, 0, Math.PI * 2, true);

    };
    ShowedArc.prototype.addListeners = function () {


        var x, y, self = this;

        function judgeCursor(event) {

            if (self.hitTest(event.layerX, event.layerY)) {
                self.canvas.style.cursor = "crosshair";
            }
            else {
                self.canvas.style.cursor = "default";
            }
        }

        this.canvas.addEventListener("mousemove", judgeCursor);
        function dragHandler(event) {
            self.poiX = event.layerX - x;
            self.poiY = event.layerY - y;
            (self.poiX < self.radio) ? self.poiX = self.radio : null;
            (self.poiX > self.maxWidth - self.radio) ? self.poiX = self.maxWidth - self.radio : null;
            (self.poiY < self.radio) ? self.poiY = self.radio : null;
            (self.poiY > self.maxHeight - self.radio) ? self.poiY = self.maxHeight - self.radio : null;
        }
        function mouseDownHandler(event) {
            if (self.hitTest(event.layerX, event.layerY)) {
                x = event.layerX - self.poiX;
                y = event.layerY - self.poiY;
                self.canvas.addEventListener("mousemove", dragHandler);
            }
        }

        this.canvas.addEventListener("mousedown", mouseDownHandler);
        document.onmouseup = function () {
            this.canvas.removeEventListener("mousemove", dragHandler);
        }.bind(this);
    };
    ShowedArc.prototype.hitTest = function (mouseX, mouseY) {
        var s = Math.sqrt(Math.pow(Math.abs(mouseX - this.poiX), 2) + Math.pow(Math.abs(mouseY - this.poiY), 2));
        return s <= this.radio;
    };
    ucai.ShowedArc = ShowedArc;
})();