/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai=window.ucai||{};
(function () {
    function LineWidth(nodeProgress,nodePointer,context) {
        this.nodeProgress=nodeProgress;
        this.nodePointer=nodePointer;
        this.context=context;
        this.nodeProgressPosition=this.nodeProgress.getBoundingClientRect();
        this.addListener();
    }
    LineWidth.prototype.addListener=function () {
        this.nodeProgress.onmousedown=function (event) {
            this.changePointerStyle(event);
            window.onmousemove=this.changePointerStyle.bind(this);
            window.addEventListener("mouseup",function () {
                window.onmousemove="";
            }.bind(this))
        }.bind(this);
    };
    LineWidth.prototype.changePointerStyle=function (event) {
        var left=event.clientX-this.nodeProgressPosition.left;
        if(left<0){
            left=0;
        }
        if(left>parseInt(getComputedStyle(this.nodeProgress).width)){
            left=parseInt(getComputedStyle(this.nodeProgress).width);
        }
        this.nodePointer.style.left=left-5+"px";
        this.context.lineWidth=left/parseInt(getComputedStyle(this.nodeProgress).width)*20;
    };
    ucai.LineWidth=LineWidth;
})();