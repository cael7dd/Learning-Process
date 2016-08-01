/**
 * Created by 87676 on 8/1/2016.
 */
class Block {
    _block;
    _pieces = [];
    _x;
    _poiX;
    _img;
    _width;

    constructor(img, x, container, amount) {
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

    createBlock() {
        for (let i = 0; i < 3; i++) {
            let temp = document.createElement("div");
            temp.className = "blockPiece";
            this._pieces.push(temp);
            temp.style.transform = `rotateX(${90 - i * 90}deg) translateZ(200px)`;
            temp.style.background = `url('${this._img[i]}') no-repeat ${this._poiX}px`;
            temp.style.backgroundSize = "600px  400px";
            this._block.appendChild(temp);
        }
    }

    getBlock() {
        return this._block;
    }

    getX() {
        return this._x;
    }

    getBlockPieceArray() {
        return this._pieces;
    }

    setImg(array) {
        this._img = array;
        for (let i = 0; i < 3; i++) {
            this._pieces[i].style.backgroundImage = `url('${this._img[i]}')`;
        }
    }
}