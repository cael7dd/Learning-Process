/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai=window.ucai||{};
(function () {
    function BlankCanvas(canvas,context,btnClear) {
        this._canvas=canvas;
        this._context=context;
        this._btnClear=btnClear;
        this.addListener();
    }
    BlankCanvas.prototype.addListener=function () {
        this._btnClear.onclick=function () {
            this._context.clearRect(0,0,this._canvas.width,this._canvas.height);
        }.bind(this);
    };
    ucai.BlankCanvas=BlankCanvas;
})();