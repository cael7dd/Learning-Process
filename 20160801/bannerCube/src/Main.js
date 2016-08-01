/**
 * Created by 87676 on 8/1/2016.
 */
var Block = (function () {
    function Block(img, x, container, amount) {
        this._pieces = [];
        this._img = img;
        this._x = x;
        this._width = 600 / amount;
        this._poiX = -this._x * this._width;
        this._block = document.createElement("div");
        this._block.className = "blockContainer";
        this._block.style.width = this._width + "px";
        container.appendChild(this._block);
        this.createBlock();
    }
    Block.prototype.createBlock = function () {
        for (var i = 0; i < 3; i++) {
            var temp = document.createElement("div");
            temp.className = "blockPiece";
            this._pieces.push(temp);
            temp.style.transform = "rotateX(" + (90 - i * 90) + "deg) translateZ(200px)";
            temp.style.background = "url('" + this._img[i] + "') no-repeat " + this._poiX + "px";
            temp.style.backgroundSize = "600px  400px";
            this._block.appendChild(temp);
        }
    };
    Block.prototype.getBlock = function () {
        return this._block;
    };
    Block.prototype.getX = function () {
        return this._x;
    };
    Block.prototype.getBlockPieceArray = function () {
        return this._pieces;
    };
    Block.prototype.setImg = function (array) {
        this._img = array;
        for (var i = 0; i < 3; i++) {
            this._pieces[i].style.backgroundImage = "url('" + this._img[i] + "')";
        }
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
        this._pieceNum = 20;
        this._busy = false;
        this._animationDuration = 2;
        this._delay = .1;
        this._btnLeft = document.querySelector("#d_left");
        this._btnRight = document.querySelector("#d_right");
        this.addImg();
        this.interval();
        this.addListeners();
    }
    Main.prototype.addImg = function () {
        for (var i = 0; i < this._pieceNum; i++) {
            var temp = new Block(this.getPiecesImg(), i, this._container, this._pieceNum);
            this._blocks.push(temp);
        }
    };
    Main.prototype.interval = function () {
        var _this = this;
        this._intervalId = setInterval(function () {
            if (!_this._busy) {
                _this._busy = true;
                _this.addAnimation(true);
            }
        }, 3000);
    };
    Main.prototype.getPiecesImg = function () {
        var top = this._currentIndex - 1;
        (top < 0) ? top = this._imgPath.length - 1 : null;
        var bottom = this._currentIndex + 1;
        (bottom == this._imgPath.length) ? bottom = 0 : null;
        return [this._imgPath[top], this._imgPath[this._currentIndex], this._imgPath[bottom]];
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
    Main.prototype.addAnimation = function (next) {
        var _this = this;
        var ani;
        (next) ? ani = "next" : ani = "last";
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].getBlock().style.animation = ani + " " + this._animationDuration + "s " + this._delay * i + "s forwards";
        }
        setTimeout(function () {
            _this._busy = false;
            (next) ? _this._currentIndex++ : _this._currentIndex--;
            (_this._currentIndex < 0) ? _this._currentIndex = _this._imgPath.length - 1 : null;
            (_this._currentIndex == _this._imgPath.length) ? _this._currentIndex = 0 : null;
            _this.changeImg();
            for (var i = 0; i < _this._blocks.length; i++) {
                _this._blocks[i].getBlock().style.animation = "";
            }
        }, (this._delay * this._blocks.length + this._animationDuration) * 1000);
    };
    Main.prototype.changeImg = function () {
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].setImg(this.getPiecesImg());
        }
    };
    return Main;
}());
new Main();
