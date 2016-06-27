/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai=window.ucai||{};
(function () {
    function IptPen(iptPen,context,canvas) {
        this.iptPen=iptPen;
        this.context=context;
        this.canvas=canvas;
        this.addListener();
    }
    IptPen.prototype.addListener=function () {
        this.iptPen.onclick=function () {
            new ucai.DrewPen(this.context, this.canvas);
        }.bind(this);
    };
    ucai.IptPen=IptPen;
})();