/**
 * Created by 87676 on 8/8/2016.
 */
///<reference path="../node_modules/definitively-typed/easeljs/easeljs.d.ts"/>
class Main {
    _stage;
    _newBallCount;
    _ballAmount;
    _ballShow;
    _shootAngle;
    _level = 1;
    _stageWidth;
    _stageHeight;
    _blockSize;
    _blockStrokeWidth;
    _ballContainer;
    _shooting;
    _blockContainer;
    _ballSize;
    _ballSpeed;
    _blockMar;

    constructor() {
        this.init();
    }

    init() {
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
    }

    upDateStage() {
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
    }

    addBlock() {
        this._blockSize = this._stageWidth / 5 - this._blockStrokeWidth * 2;
        for (var i = 0; i < 5; i++) {
            if (Math.random() < .5) {
                var a = new Block(i, 1 - this._level, this._blockSize, Math.max(1, Math.round(this._level * Math.random())), this._blockStrokeWidth);
                this._blockContainer.push(a);
                this._blockMar.addChild(a.getBlock());
            }

        }
    }

    addListeners() {
        var startX, startY, endX, endY, angle;
        var line = new createjs.Shape();

        this._stage.addChild(line);
        document.addEventListener("touchstart", (event)=> {
            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
        });
        document.addEventListener("touchmove", (event)=> {
            endX = event.touches[0].pageX;
            endY = event.touches[0].pageY;

            line.graphics.clear();
            if (!this._shooting) {
                line.graphics.beginStroke("#fff");
                line.graphics.moveTo(this._stageWidth/2, this._stageHeight);
                angle = Math.acos((endX - startX) / Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2)));
                line.graphics.lineTo(Math.cos(angle) * 1000 + 180, -Math.sin(angle) * 1000 + 640);
            }
        });
        document.addEventListener("touchend", ()=> {
            if (!this._shooting && endY < startY) {
                this._shootAngle = angle;
                this._ballShow = this._ballAmount;
                this._newBallCount = 9;
                line.graphics.clear();
            }
        });
    }

    judgeHit() {
        for (var i = 0; i < this._ballContainer.length; i++) {
            for (var j = 0; j < this._blockContainer.length; j++) {
                var ball = this._ballContainer[i];
                var block = this._blockContainer[j];
                if (block.getLastHitBall() != ball.getID()) {
                    var ballPt = {x: ball.getX(), y: ball.getY()};
                    var blockPt = {x: block.getPoiX(), y: block.getPoiY() + this._blockMar.y};
                    if (ballPt.y+this._blockStrokeWidth+2 >= blockPt.y && ballPt.y -this._blockStrokeWidth-2<= blockPt.y + this._blockSize &&
                        (Math.abs(ballPt.x + this._ballSize - blockPt.x) <= this._ballSpeed || Math.abs(ballPt.x - this._ballSize - blockPt.x - this._blockSize) <= this._ballSpeed)) {
                        this.hitBlock(j, i, true);
                        block.setLastHitBall(ball.getID());
                    } else if (ballPt.x +this._blockStrokeWidth+2>= blockPt.x -this._blockStrokeWidth-2&& ballPt.x <= blockPt.x + this._blockSize &&
                        (Math.abs(ballPt.y + this._ballSize - blockPt.y) <= this._ballSpeed || Math.abs(ballPt.y - this._ballSize - blockPt.y - this._blockSize) <= this._ballSpeed)) {
                        this.hitBlock(j, i, false);
                        block.setLastHitBall(ball.getID());
                    }

                }

            }
        }
    }

    hitBlock(index, index2, isVertical) {
        this._ballContainer[index2].setAngle(isVertical);
        var block = this._blockContainer[index];
        block.minusText();
        if (block.getText() == 0) {
            this._blockMar.removeChild(block.getBlock());
            this._blockContainer.splice(index, 1);
        }
    }

    judgeFallen() {
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
    }

    nextLevel() {
        for (var i = 0; i < this._blockContainer.length; i++) {
            this._blockContainer[i].setLastHitBall(-2);
        }
        this._blockMar.y += (this._blockSize + this._blockStrokeWidth * 2);
        this._level++;
        this.addBlock();
        this._ballAmount++;
    }

    addBall() {
        this._shooting = true;
        var a = new Ball(this._stageWidth / 2, this._stageHeight - 10, this._ballSize, this._ballSpeed, this._shootAngle, this._ballAmount - this._ballShow);
        this._ballContainer.push(a);
        this._stage.addChild(a.getBall());
    }

}
new Main;











