var Card = (function (_super) {
    __extends(Card, _super);
    function Card(num, x, y) {
        _super.call(this);
        this._x = x;
        this._y = y;
        this._num = num;
        this._container = new egret.DisplayObjectContainer();
        this.createCard();
    }
    var d = __define,c=Card,p=c.prototype;
    d(p, "container"
        ,function () {
            return this._container;
        }
    );
    p.createCard = function () {
        this._text = new egret.TextField();
        this._text.text = this._num;
        this._cardA = new egret.DisplayObjectContainer();
        this._cardAB = new egret.Sprite();
        this._cardAB.graphics.beginFill(Card.getRandomColor());
        this._cardAB.graphics.drawRect(0, 0, 75, 75);
        this._cardAB.graphics.endFill();
        this._cardA.addChild(this._cardAB);
        this._cardA.addChild(this._text);
        this._text.x = 25;
        this._text.y = 25;
        this._cardB = new egret.Sprite();
        this._cardB.graphics.beginFill(Card.getRandomColor());
        this._cardB.graphics.drawRect(0, 0, 75, 75);
        this._cardB.graphics.endFill();
        this.addChild(this._cardB);
        this.addChild(this._cardA);
        this.x = this._x;
        this.y = this._y;
    };
    p.wrongAnsAnimate = function () {
        var ani = egret.Tween.get(this);
        ani.to({ x: this._x - 10 }, 100).to({ x: this._x + 10, }, 200).to({ x: this._x - 10 }, 200).to({ x: this._x }, 100);
    };
    p.flipAnimate = function (isToBack) {
        if (isToBack) {
            this.scaleMin(this._cardA, this._cardB);
        }
        else {
            this.scaleMin(this._cardB, this._cardA);
        }
    };
    p.scaleMin = function (obj1, obj2) {
        obj2.scaleX = 0;
        obj2.x = 37.5;
        var scaleSmall = egret.Tween.get(obj1);
        var self = this;
        scaleSmall.to({ scaleX: 0, x: 37.5 }, 200);
        scaleSmall.call(function () {
            self.scaleMax(obj2);
        }, this, obj2);
    };
    p.scaleMax = function (obj) {
        var scaleSmall = egret.Tween.get(obj);
        scaleSmall.to({ scaleX: 1, x: 0 }, 200);
    };
    Card.getRandomColor = function () {
        var str;
        str = Math.floor(Math.random() * 16777215);
        str = "0x" + str.toString(16);
        return str;
    };
    return Card;
}(egret.DisplayObjectContainer));
egret.registerClass(Card,'Card');
//# sourceMappingURL=Card.js.map