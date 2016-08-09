/**
 * Created by 87676 on 8/8/2016.
 */
var Ball = (function () {
    function Ball(x, y, size, speed, angle, id) {
        this._x = x;
        this._y = y;
        this._size = size;
        this._speed = speed;
        this._angle = angle;
        this._id = id;
        this._stepX = this._speed * Math.cos(this._angle);
        this._stepY = this._speed * Math.sin(this._angle);
        this._fallen = false;
        this.createBall();
    }
    Ball.prototype.createBall = function () {
        this._ball = new createjs.Shape();
        this._ball.graphics.beginFill("#fff");
        this._ball.graphics.drawCircle(0, 0, this._size);
        this._ball.graphics.endFill();
        this._ball.x = this._x;
        this._ball.y = this._y;
        this._ball.addEventListener("tick", this.moveBall.bind(this));
    };
    Ball.prototype.moveBall = function () {
        this._ball.x += this._stepX;
        this._ball.y -= this._stepY;
        this.judgeHit();
    };
    Ball.prototype.judgeHit = function () {
        if (this._ball.x <= this._size || this._ball.x >= window.innerWidth - this._size) {
            this._angle = Math.PI - this._angle;
            this.adjustStep();
        }
        if (this._ball.y <= this._size) {
            this._angle = -this._angle;
            this.adjustStep();
        }
        if (this._ball.y >= window.innerHeight + this._size + 2) {
            this._fallen = true;
            this._ball.removeAllEventListeners("tick");
        }
    };
    Ball.prototype.getID = function () {
        return this._id;
    };
    Ball.prototype.adjustStep = function () {
        this._stepX = this._speed * Math.cos(this._angle);
        this._stepY = this._speed * Math.sin(this._angle);
    };
    Ball.prototype.getX = function () {
        return this._ball.x;
    };
    Ball.prototype.getY = function () {
        return this._ball.y;
    };
    Ball.prototype.setAngle = function (isVertical) {
        if (isVertical) {
            this._angle = Math.PI - this._angle;
        }
        else {
            this._angle = -this._angle;
        }
        this.adjustStep();
    };
    Ball.prototype.isFallen = function () {
        return this._fallen;
    };
    Ball.prototype.getBall = function () {
        return this._ball;
    };
    return Ball;
}());
/**
 * Created by 87676 on 8/8/2016.
 */
var Block = (function () {
    function Block(x, y, size, amount, strokeWidth) {
        this._x = x;
        this._y = y;
        this._size = size;
        this._amount = amount;
        this._strokeWidth = strokeWidth;
        this._lastHitBall = -2;
        this._poiX = this._x * (this._size + this._strokeWidth * 2) + this._strokeWidth;
        this._poiY = this._y * (this._size + this._strokeWidth * 2) + this._strokeWidth;
        this.createBlock();
    }
    Block.prototype.changeColor = function () {
        this._text.color = "hsl(" + 20 * this._amount + ",100%,50%)";
        return "hsl(" + 40 + 20 * this._amount + ",100%,50%)";
    };
    Block.prototype.getLastHitBall = function () {
        return this._lastHitBall;
    };
    Block.prototype.setLastHitBall = function (value) {
        this._lastHitBall = value;
    };
    Block.prototype.createBlock = function () {
        this._container = new createjs.Container();
        this._block = new createjs.Shape();
        this._text = new createjs.Text(this._amount, "20px Arial", "red");
        this._block.graphics.setStrokeStyle(this._strokeWidth, "round").beginStroke(this.changeColor());
        this._block.graphics.drawRect(0, 0, this._size, this._size);
        this._text.x = this._size / 2 - 10;
        this._text.y = this._size / 2 - 10;
        this._container.addChild(this._block, this._text);
        this._container.x = this._poiX;
        this._container.y = this._poiY;
    };
    Block.prototype.getBlock = function () {
        return this._container;
    };
    Block.prototype.getRect = function () {
        return this._block;
    };
    Block.prototype.minusText = function () {
        this._amount--;
        this._text.text = this._amount;
        this.changeColor();
    };
    Block.prototype.getPoiX = function () {
        return this._poiX;
    };
    Block.prototype.getPoiY = function () {
        return this._poiY;
    };
    Block.prototype.getText = function () {
        return this._amount;
    };
    Block.getColor = function (num) {
    };
    return Block;
}());
/**
 * Created by 87676 on 8/8/2016.
 */
///<reference path="../node_modules/definitively-typed/easeljs/easeljs.d.ts"/>
var Main = (function () {
    function Main() {
        this._level = 1;
        this.init();
    }
    Main.prototype.init = function () {
        this._newBallCount = 9;
        this._stage = new createjs.Stage("canvas");
        createjs.Ticker.addEventListener("tick", this.upDateStage.bind(this));
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        this._ballAmount = 1;
        this._blockStrokeWidth = 2;
        this._stageWidth = window.innerWidth;
        this._stageHeight = window.innerHeight;
        this._stage.autoClear = true;
        this._ballShow = 0;
        this._ballSize = 10;
        this._ballSpeed = 10;
        this._level = 1;
        this._shooting = false;
        this._blockMar = new createjs.Container();
        this._stage.addChild(this._blockMar);
        this._blockContainer = [];
        this._ballContainer = [];
        this.addBlock();
        this.addListeners();
    };
    Main.prototype.upDateStage = function () {
        this._stage.update();
        if (this._shooting) {
            this.judgeFallen();
            this.judgeHit();
        }
        if (this._ballShow != 0) {
            this._newBallCount++;
            if (this._newBallCount == 10) {
                this.addBall();
                this._newBallCount = 0;
                this._ballShow--;
            }
        }
    };
    Main.prototype.addBlock = function () {
        this._blockSize = this._stageWidth / 5 - this._blockStrokeWidth * 2;
        for (var i = 0; i < 5; i++) {
            if (Math.random() < .5) {
                var a = new Block(i, 1 - this._level, this._blockSize, Math.max(1, Math.round(this._level * Math.random())), this._blockStrokeWidth);
                this._blockContainer.push(a);
                this._blockMar.addChild(a.getBlock());
            }
        }
    };
    Main.prototype.addListeners = function () {
        var _this = this;
        var startX, startY, endX, endY, angle;
        var line = new createjs.Shape();
        this._stage.addChild(line);
        document.addEventListener("touchstart", function (event) {
            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
        });
        document.addEventListener("touchmove", function (event) {
            endX = event.touches[0].pageX;
            endY = event.touches[0].pageY;
            line.graphics.clear();
            if (!_this._shooting) {
                line.graphics.beginStroke("#fff");
                line.graphics.moveTo(_this._stageWidth / 2, _this._stageHeight);
                angle = Math.acos((endX - startX) / Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2)));
                line.graphics.lineTo(Math.cos(angle) * 1000 + 180, -Math.sin(angle) * 1000 + 640);
            }
        });
        document.addEventListener("touchend", function () {
            if (!_this._shooting && endY < startY) {
                _this._shootAngle = angle;
                _this._ballShow = _this._ballAmount;
                _this._newBallCount = 9;
                line.graphics.clear();
            }
        });
    };
    Main.prototype.judgeHit = function () {
        for (var i = 0; i < this._ballContainer.length; i++) {
            for (var j = 0; j < this._blockContainer.length; j++) {
                var ball = this._ballContainer[i];
                var block = this._blockContainer[j];
                if (block.getLastHitBall() != ball.getID()) {
                    var ballPt = { x: ball.getX(), y: ball.getY() };
                    var blockPt = { x: block.getPoiX(), y: block.getPoiY() + this._blockMar.y };
                    if (ballPt.y + this._blockStrokeWidth + 2 >= blockPt.y && ballPt.y - this._blockStrokeWidth - 2 <= blockPt.y + this._blockSize &&
                        (Math.abs(ballPt.x + this._ballSize - blockPt.x) <= this._ballSpeed || Math.abs(ballPt.x - this._ballSize - blockPt.x - this._blockSize) <= this._ballSpeed)) {
                        this.hitBlock(j, i, true);
                        block.setLastHitBall(ball.getID());
                    }
                    else if (ballPt.x + this._blockStrokeWidth + 2 >= blockPt.x - this._blockStrokeWidth - 2 && ballPt.x <= blockPt.x + this._blockSize &&
                        (Math.abs(ballPt.y + this._ballSize - blockPt.y) <= this._ballSpeed || Math.abs(ballPt.y - this._ballSize - blockPt.y - this._blockSize) <= this._ballSpeed)) {
                        this.hitBlock(j, i, false);
                        block.setLastHitBall(ball.getID());
                    }
                }
            }
        }
    };
    Main.prototype.hitBlock = function (index, index2, isVertical) {
        this._ballContainer[index2].setAngle(isVertical);
        var block = this._blockContainer[index];
        block.minusText();
        if (block.getText() == 0) {
            this._blockMar.removeChild(block.getBlock());
            this._blockContainer.splice(index, 1);
        }
    };
    Main.prototype.judgeFallen = function () {
        for (var i = 0; i < this._ballContainer.length; i++) {
            if (this._ballContainer[i].isFallen()) {
                this._stage.removeChild(this._ballContainer[i].getBall());
                this._ballContainer.splice(i, 1);
                i--;
                if (this._ballContainer.length == 0) {
                    this._shooting = false;
                    this.nextLevel();
                }
            }
        }
    };
    Main.prototype.nextLevel = function () {
        for (var i = 0; i < this._blockContainer.length; i++) {
            this._blockContainer[i].setLastHitBall(-2);
        }
        this._blockMar.y += (this._blockSize + this._blockStrokeWidth * 2);
        this._level++;
        this.addBlock();
        this._ballAmount++;
    };
    Main.prototype.addBall = function () {
        this._shooting = true;
        var a = new Ball(this._stageWidth / 2, this._stageHeight - 10, this._ballSize, this._ballSpeed, this._shootAngle, this._ballAmount - this._ballShow);
        this._ballContainer.push(a);
        this._stage.addChild(a.getBall());
    };
    return Main;
}());
new Main;
