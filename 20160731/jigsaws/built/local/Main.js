/**
 * Created by 87676 on 7/29/2016.
 */
var Block = (function () {
    function Block(img, size, x, y) {
        this._img = img;
        this._size = size;
        this._poiX = x;
        this._poiY = y;
        this.createBlock();
    }
    Block.prototype.createBlock = function () {
        this._block = new createjs.Bitmap(this._img);
        //this._block.resourceRect=new createjs.Rectangle(this._poiX,this._poiY,this._size,this._size);
    };
    Object.defineProperty(Block.prototype, "block", {
        get: function () {
            return this._block;
        },
        enumerable: true,
        configurable: true
    });
    return Block;
}());
/**
 * Created by 87676 on 7/29/2016.
 */
///<reference path="../node_modules/definitively-typed/easeljs/easeljs.d.ts"/>
var Main = (function () {
    function Main() {
        var _this = this;
        this._stage = new createjs.Stage("canvas");
        this._stage.addEventListener("tick", function () {
            _this._stage.update();
        });
        var rect = new createjs.Shape();
        rect.graphics.beginFill("red").drawRect(0, 0, 100, 100);
        this._stage.addChild(rect);
        // this.startNewLevel();
    }
    return Main;
}());
