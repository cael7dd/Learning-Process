/**
 * Created by 87676 on 8/1/2016.
 */
class Main {
    _container;
    _imgPath;
    _currentIndex;
    _btnLeft;
    _btnRight;
    _blocks = [];
    _pieceNum;
    _busy;
    _animationDuration;
    _delay;
    _intervalId;

    constructor() {
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

    addImg() {
        for (let i = 0; i < this._pieceNum; i++) {
            var temp = new Block(this.getPiecesImg(), i, this._container, this._pieceNum);
            this._blocks.push(temp);
        }
    }

    interval() {

        this._intervalId = setInterval(()=> {
            if (!this._busy) {
                this._busy = true;
                this.addAnimation(true);
            }
        }, 3000);


    }

    getPiecesImg() {
        let top = this._currentIndex - 1;
        (top < 0) ? top = this._imgPath.length - 1 : null;
        let bottom = this._currentIndex + 1;
        (bottom == this._imgPath.length) ? bottom = 0 : null;
        return [this._imgPath[top], this._imgPath[this._currentIndex], this._imgPath[bottom]];
    }

    addListeners() {
        this._btnLeft.addEventListener("click", ()=> {
            if (!this._busy) {
                this._busy = true;
                this.addAnimation(false);
            }
        });
        this._btnRight.addEventListener("click", ()=> {
            if (!this._busy) {
                this._busy = true;
                this.addAnimation(true);
            }
        });
    }

    addAnimation(next) {
        var ani;
        (next) ? ani = "next" : ani = "last";
        for (let i = 0; i < this._blocks.length; i++) {
            this._blocks[i].getBlock().style.animation = `${ani} ${this._animationDuration}s ${this._delay * i}s forwards`;
        }
        setTimeout(()=> {
            this._busy = false;
            (next) ? this._currentIndex++ : this._currentIndex--;
            (this._currentIndex < 0) ? this._currentIndex = this._imgPath.length - 1 : null;
            (this._currentIndex == this._imgPath.length) ? this._currentIndex = 0 : null;
            this.changeImg();
            for (let i = 0; i < this._blocks.length; i++) {
                this._blocks[i].getBlock().style.animation = "";
            }
        }, (this._delay * this._blocks.length + this._animationDuration) * 1000);
    }

    changeImg() {
        for (let i = 0; i < this._blocks.length; i++) {
            this._blocks[i].setImg(this.getPiecesImg());
        }
    }
}
new Main();