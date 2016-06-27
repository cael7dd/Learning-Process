/**
 * Created by 87676 on 2016/6/27.
 */
window.ucai = window.ucai || {};
(function () {
    function PenColor(context, openColorNode, colorNodes, colorContainer) {
        this._context = context;
        this._openColorNode = openColorNode;
        this._colorNodes = colorNodes;
        this._colorContainer = colorContainer;
       // this.addPenColor();
        this.addListener();
    }

    PenColor.prototype.addListener = function () {
        this._openColorNode.onclick = function () {
            this._colorContainer.style.display = "block";
        }.bind(this);
        for (var i = 0; i < this._colorNodes.length; i++) {
            (function (m) {
                this._colorNodes[m].onclick = function () {
                    this._context.strokeStyle = /(.+)\)/.exec(getComputedStyle(this._colorNodes[m]).background)[1];
                    this._openColorNode.style.background = getComputedStyle(this._colorNodes[m]).background;
                    this._colorContainer.style.display = "none";
                }.bind(this);
            }).call(this, i);
        }
    };
    // PenColor.prototype.addPenColor = function () {
    //     for (var i = 1; i < this._colorNodes.length; i++) {
    //         this._colorNodes[i].style.background = this.randomColor();
    //     }
    // };
    // PenColor.prototype.randomColor = function () {
    //     var temp;
    //     var color = [];
    //     for (var i = 0; i < 3; i++) {
    //         temp = parseInt(Math.random() * 255).toString(16);
    //         if (temp.length < 2) {
    //             temp = "0" + temp;
    //         }
    //         color.push(temp);
    //     }
    //     return "#" + color[0] + color[1] + color[2];
    // };
    ucai.PenColor = PenColor;
})();