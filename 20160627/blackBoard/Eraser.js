/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai=window.ucai||{};
(function () {
    function Eraser(context,canvas) {
        this.context=context;
        this.canvas=canvas;
        this.addListener();
        this.canvasPosition=this.canvas.getBoundingClientRect();
    }
    Eraser.prototype.addListener=function () {
        this.canvas.onmousedown=function (event) {
            this.eraserMouse(event);
            this.canvas.onmousemove=this.eraserMouse.bind(this);
            window.onmouseup=function () {
                this.onmousemove="";
            }.bind(this);
        }.bind(this);
    };
    Eraser.prototype.eraserMouse=function (event) {
        this.context.clearRect(event.clientX-52-this.canvasPosition.left,event.clientY-52-this.canvasPosition.top,50,50);
    };
    ucai.Eraser=Eraser;
})();