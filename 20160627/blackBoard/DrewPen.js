/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai=window.ucai||{};
(function () {
    function DrewPen(context,node) {
        this._node=node;
        this._context=context;
        this._nodePosition=this._node.getBoundingClientRect();
        this.addListener();
    }
    DrewPen.prototype.addListener=function () {
        this._context.strokeStyle="#fff";
        this._context.lineWidth="1";
        this._node.onmousedown=function (event) {
            this._context.beginPath();
            this._context.moveTo(event.clientX-this._nodePosition.left-27,event.clientY-this._nodePosition.top-27);
            this._node.onmousemove=function (event) {
                this._context.lineTo(event.clientX-this._nodePosition.left-27,event.clientY-this._nodePosition.top-27);
                this._context.stroke();
            }.bind(this);
        }.bind(this);
        window.onmouseup=function () {
            this._context.closePath();
            this._node.onmousemove="";
        }.bind(this);
    };
    ucai.DrewPen=DrewPen;
})();