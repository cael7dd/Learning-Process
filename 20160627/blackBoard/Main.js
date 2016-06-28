/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai = window.ucai || {};
(function () {
    function Main() {
        this._canvas = document.getElementById("blackBoard");
        this._context = this._canvas.getContext("2d");
        this._btnChangeColor = document.getElementById("ipt_color");
        this._colorsContainer = document.getElementById("d_colorList");
        this._colors = document.getElementsByClassName("d_color");
        this._btnClear=document.getElementById("btnClear");
        this._iptEraser=document.getElementById("iptEraser");
        this._iptPen=document.getElementById("iptPen");
        this.lineProgress=document.getElementById("d_lineWidthContainer");
        this.linePointer=document.getElementById("d_lineWidthPointer");
        new ucai.LineWidth(this.lineProgress,this.linePointer,this.context);
        new ucai.DrewPen(this.context, this.canvas);
        new ucai.PenColor(this.context, this.btnChangColor, this.colors, this.colorsContainer);
        new ucai.BlankCanvas(this.canvas,this.context,this.btnClear);
        new ucai.IptPen(this.iptPen,this.context, this.canvas);
        new ucai.IptEraser(this.iptEraser,this.context, this.canvas);

    }
    Object.defineProperties(Main.prototype, {
        "context": {
            get: function () {
                return this._context;
            }
        },
        "canvas": {
            get: function () {
                return this._canvas;
            }
        },
        "btnChangColor": {
            get: function () {
                return this._btnChangeColor;
            }
        },
        "colors": {
            get: function () {
                return this._colors;
            }
        },
        "colorsContainer": {
            get: function () {
                return this._colorsContainer;
            }
        },
        "btnClear": {
            get: function () {
                return this._btnClear;
            }
        },
        "iptEraser": {
            get: function () {
                return this._iptEraser;
            }
        },
        "iptPen": {
            get: function () {
                return this._iptPen;
            }
        }
    });
    new Main();
})();