/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai=window.ucai||{};
(function () {
    function IptEraser(iptEraser,context,canvas) {
        this.iptEraser=iptEraser;
        this.context=context;
        this.canvas=canvas;
        this.addListener();
    }
    IptEraser.prototype.addListener=function () {
        this.iptEraser.onclick=function () {
            new ucai.Eraser(this.context,this.canvas);
        }.bind(this);
    };
    ucai.IptEraser=IptEraser;
})();