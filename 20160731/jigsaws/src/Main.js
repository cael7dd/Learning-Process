/**
 * Created by 87676 on 7/29/2016.
 */
var Block = (function () {
    function Block(img, size, x, y) {
        this._img = img;
        this._size = size;
        this.isRight = true;
        this._originX = this._x = x;
        this._originY = this._y = y;
        this._poiX = x * this._size;
        this._poiY = y * this._size;
        this.createBlock();
    }
    Block.prototype.createBlock = function () {
        this._block = new createjs.Bitmap(this._img);
        var imgBound = this._block.getBounds();
        var scale, x = 0, y = 0;
        if (imgBound.width >= imgBound.height) {
            scale = 500 / imgBound.height;
            x = (imgBound.width - 500) / 2 * scale;
        }
        else {
            scale = 500 / imgBound.width;
            y = (imgBound.height - 500) / 2 * scale;
        }
        x += this._poiX / scale;
        y += this._poiY / scale;
        this._block.sourceRect = new createjs.Rectangle(x, y, this._size / scale, this._size / scale);
        this._block.scaleX = scale;
        this._block.scaleY = scale;
        this._block.x = this._poiX;
        this._block.y = this._poiY;
    };
    Block.prototype.getBlock = function () {
        return this._block;
    };
    Block.prototype.getX = function () {
        return this._x;
    };
    Block.prototype.getY = function () {
        return this._y;
    };
    Block.prototype.getOriginX = function () {
        return this._originX;
    };
    Block.prototype.getOriginY = function () {
        return this._originY;
    };
    Block.prototype.setX = function (value) {
        this._x = value;
        this._block.x = this._x * this._size;
    };
    Block.prototype.setY = function (value) {
        this._y = value;
        this._block.y = this._y * this._size;
    };
    return Block;
}());
/**
 * Created by 87676 on 7/29/2016.
 */
///<reference path="../node_modules/definitively-typed/easeljs/easeljs.d.ts"/>
var Main = (function () {
    function Main() {
        this._busy = false;
        this.init();
    }
    Main.prototype.init = function () {
        this._btnRandom = document.querySelector("#random");
        this._level = 5;
        this._iptLevel = document.querySelector("#d_level");
        this._iptLevel.value = this._level - 1;
        this._imgPath = "src/1.jpg";
        this._stage = new createjs.Stage("canvas");
        this._iptFile = document.querySelector("#ipt_file");
        this.addImage();
        this.startNewLevel();
    };
    Main.prototype.startNewLevel = function () {
        this._stage.removeAllChildren();
        this._blockArray = [];
        this._random = false;
        this._btnRandom.innerHTML = "开始打乱";
        createjs.Ticker.addEventListener("tick", this._stage);
        this._busy = false;
        this._aniDur = 200 - 199 / 9 * (this._level - 2);
        this._blockAmount = Math.pow(this._level, 2) - 1;
        this._wrongNum = 0;
        this._size = 500 / this._level;
        this.addBlocks();
        this._blankX = this._blankY = this._level - 1;
        this._movedX = false;
        this.addListeners();
    };
    Main.prototype.addBlocks = function () {
        var jLength = this._level;
        for (var i = 0; i < this._level; i++) {
            if (i == this._level - 1) {
                jLength = this._level - 1;
            }
            for (var j = 0; j < jLength; j++) {
                var a = new Block(this._imgPath, this._size, i, j);
                this._blockArray.push(a);
                this._stage.addChild(a.getBlock());
            }
        }
    };
    Main.prototype.addImage = function () {
        var _this = this;
        var reader = new FileReader();
        this._iptFile.addEventListener("change", function (event) {
            if (event.target.files[0].type == "image/jpeg") {
                reader.onload = function () {
                    _this._imgPath = reader.result;
                    _this.startNewLevel();
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    };
    Main.prototype.addListeners = function () {
        var _this = this;
        var self = this;
        for (var i = 0; i < this._blockArray.length; i++) {
            (function (m) {
                self._blockArray[m].getBlock().addEventListener("click", function () {
                    if (Math.abs(self._blockArray[m].getX() - self._blankX) * Math.abs(self._blockArray[m].getY() - self._blankY) == 0 &&
                        Math.abs(self._blockArray[m].getX() - self._blankX) <= 1 &&
                        Math.abs(self._blockArray[m].getY() - self._blankY) <= 1 && !self._busy) {
                        self._busy = true;
                        var toX = self._blankX;
                        var toY = self._blankY;
                        self.judgeResult.call(self, self._blockArray[m], toX, toY);
                        createjs.Tween.get(self._blockArray[m].getBlock()).to({ x: self._blankX * self._size, y: self._blankY * self._size }, 300)
                            .call(function () {
                            self._blockArray[m].setX(toX);
                            self._blockArray[m].setY(toY);
                            self._busy = false;
                        }, this);
                        self._blankX = self._blockArray[m].getX();
                        self._blankY = self._blockArray[m].getY();
                    }
                });
            })(i);
        }
        this._btnRandom.onclick = function () {
            if (!_this._random) {
                _this._busy = true;
                _this._random = true;
                _this._btnRandom.innerHTML = "停止打乱";
                _this.findNextMove();
            }
            else {
                _this._busy = false;
                _this._random = false;
                _this._btnRandom.innerHTML = "开始打乱";
            }
        };
        this._iptLevel.addEventListener("input", function () {
            var temp = parseInt(_this._iptLevel.value);
            temp = Math.max(0, temp);
            temp = Math.min(10, temp);
            _this._iptLevel.value = temp;
        });
        this._iptLevel.addEventListener("blur", function () {
            _this._level = parseInt(_this._iptLevel.value) + 1;
            _this.startNewLevel();
        });
    };
    Main.prototype.judgeResult = function (obj, x, y) {
        var rightX = obj.getOriginX();
        var rightY = obj.getOriginY();
        if (x == rightX && y == rightY && !obj.isRight) {
            this._wrongNum--;
            obj.isRight = true;
        }
        else if ((x != rightX || y != rightY) && obj.isRight) {
            this._wrongNum++;
            obj.isRight = false;
        }
        if (!this._random && this._wrongNum == 0) {
            alert("恭喜过关！");
        }
    };
    Main.prototype.addBlockAnimation = function (x, y) {
        var self = this;
        var temp = this.getNextBlock(this._blankX, this._blankY);
        this.judgeResult.call(this, temp, x, y);
        createjs.Tween.get(temp.getBlock()).to({ x: x * this._size, y: y * this._size }, this._aniDur)
            .call(function () {
            temp.setX(x);
            temp.setY(y);
            createjs.Tween.removeAllTweens();
            self.findNextMove();
        });
    };
    Main.prototype.findNextMove = function () {
        if (this._random) {
            if (!this._movedX) {
                this.randomDir("_blankX");
                this._movedX = true;
            }
            else {
                this.randomDir("_blankY");
                this._movedX = false;
            }
        }
        else {
            createjs.Tween.removeAllTweens();
        }
    };
    Main.prototype.randomDir = function (property) {
        if (this[property] - 1 < 0 || Math.random() >= 0.5 && this[property] + 1 < this._level) {
            this[property]++;
            if (property == "_blankX") {
                this.addBlockAnimation.call(this, this._blankX - 1, this._blankY);
            }
            else {
                this.addBlockAnimation.call(this, this._blankX, this._blankY - 1);
            }
        }
        else {
            this[property]--;
            if (property == "_blankX") {
                this.addBlockAnimation(this._blankX + 1, this._blankY);
            }
            else {
                this.addBlockAnimation(this._blankX, this._blankY + 1);
            }
        }
    };
    Main.prototype.getNextBlock = function (x, y) {
        for (var i = 0; i < this._blockArray.length; i++) {
            if (this._blockArray[i].getX() == x && this._blockArray[i].getY() == y) {
                return this._blockArray[i];
            }
        }
    };
    return Main;
}());
new Main();
