/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai=window.ucai||{};
(function () {
    function CoordinateSystem(context,beginPoi,charWidth,charHeight,length) {
        this._context=context;
        this.beginPoi=beginPoi;
        this.chartWidth=charWidth;
        this.chartHeight=charHeight;
        this.length=length;
        this.drewSystem();
    }
    CoordinateSystem.prototype.drewSystem=function () {
        this._context.moveTo(this.beginPoi[0], this.beginPoi[1]);
        this._context.lineTo(this.beginPoi[0], this.beginPoi[1] + this.chartHeight);
        this._context.lineTo(this.beginPoi[0] + this.chartWidth, this.beginPoi[1] + this.chartHeight);
        this._context.stroke();
        var x = this.beginPoi[0], y = this.beginPoi[1];
        for (var i = 0; i < 10; i++) {
            this._context.moveTo(x, y);
            this._context.lineTo(x + 5, y);
            this._context.stroke();
            y += this.chartHeight / 10;
        }
        this._context.moveTo(this.beginPoi[0], this.beginPoi[1] + this.chartHeight);
        x = this.beginPoi[0];
        y = this.beginPoi[1]+this.chartHeight;
        for (i = 0; i < this.length; i++) {
            this._context.moveTo(x, y);
            this._context.lineTo(x , y-5);
            this._context.stroke();
            x += this.chartWidth / this.length;
        }
    };
    ucai.CoordinateSystem=CoordinateSystem;
})();