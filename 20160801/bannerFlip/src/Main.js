/**
 * Created by 87676 on 8/1/2016.
 */
var Block = (function () {
    function Block(img, width, height, x, y, container) {
        this._img = img;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._block = document.createElement("div");
        this._block.className = "block";
        this._block.style.width = this._width + "px";
        this._block.style.height = this._height + "px";
        container.appendChild(this._block);
        this.createBlock();
    }
    Block.prototype.createBlock = function () {
        this._block.style.background = "url('" + this._img + "') no-repeat " + -this._x * this._width + "px " + -this._y * this._height + "px";
        this._block.style.backgroundSize = "600px 400px";
    };
    Block.prototype.getBlock = function () {
        return this._block;
    };
    Block.prototype.setImg = function (img) {
        this._img = img;
        this._block.style.backgroundImage = "url('" + this._img + "')";
    };
    return Block;
}());
/**
 * Created by 87676 on 8/1/2016.
 */
var Main = (function () {
    function Main() {
        this._blocks = [];
        this._container = document.querySelector("#d_container");
        this._imgPath = ["../img/a (1).jpg", "../img/a (2).jpg", "../img/a (3).jpg", "../img/a (4).jpg",
            "../img/a (5).jpg", "../img/a (6).jpg", "../img/a (7).jpg", "../img/a (8).jpg", "../img/a (9).jpg"];
        this._currentIndex = 0;
        this._busy = false;
        this._pieceNum = 5;
        this._animationDuration = 1;
        this._delay = 0.04;
        this._imgWidth = 600 / this._pieceNum;
        this._imgHeight = 400 / this._pieceNum;
        this._btnLeft = document.querySelector("#d_left");
        this._btnRight = document.querySelector("#d_right");
        this.addImg();
        this.addListeners();
        this.interval();
    }
    Main.prototype.addImg = function () {
        for (var i = 0; i < this._pieceNum; i++) {
            for (var j = 0; j < this._pieceNum; j++) {
                var temp = new Block(this._imgPath[this._currentIndex], this._imgWidth, this._imgHeight, j, i, this._container);
                this._blocks.push(temp);
            }
        }
    };
    Main.prototype.interval = function () {
        this._intervalId = setInterval(this.addAnimation.bind(this, true), 4000);
    };
    Main.prototype.addListeners = function () {
        var _this = this;
        this._btnLeft.addEventListener("click", function () {
            if (!_this._busy) {
                _this._busy = true;
                _this.addAnimation(false);
            }
        });
        this._btnRight.addEventListener("click", function () {
            if (!_this._busy) {
                _this._busy = true;
                _this.addAnimation(true);
            }
        });
    };
    Main.prototype.judgeIndex = function () {
        (this._currentIndex < 0) ? this._currentIndex = this._imgPath.length - 1 : null;
        (this._currentIndex == this._imgPath.length) ? this._currentIndex = 0 : null;
    };
    Main.prototype.addAnimation = function (next) {
        var _this = this;
        var self = this;
        (next) ? this._currentIndex++ : this._currentIndex--;
        this.judgeIndex();
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].getBlock().style.animation = "next " + this._animationDuration + "s ease " + this._delay * i + "s forwards";
            (function (m) {
                setTimeout(function () {
                    self._blocks[m].setImg(self._imgPath[self._currentIndex]);
                    self._blocks[m].getBlock().style.animation = "last " + self._animationDuration + "s ease forwards";
                }, (self._delay * m + self._animationDuration) * 1000);
            })(i);
        }
        setTimeout(function () {
            _this._busy = false;
        }, (this._delay * this._blocks.length + this._animationDuration) * 1000);
    };
    return Main;
}());
new Main();
