/**
 * Created by 87676 on 8/8/2016.
 */
class Block{
    _amount;_block;_x;_y;_size;_text;_container;_strokeWidth;_poiX;_poiY;_lastHitBall;
    constructor(x,y,size,amount,strokeWidth){
        this._x=x;
        this._y=y;
        this._size=size;
        this._amount=amount;
        this._strokeWidth=strokeWidth;
        this._lastHitBall=-2;
        this._poiX=this._x*(this._size+this._strokeWidth*2)+this._strokeWidth;
        this._poiY=this._y*(this._size+this._strokeWidth*2)+this._strokeWidth;
        this.createBlock();
    }
    changeColor(){
        this._text.color="hsl("+20*this._amount+",100%,50%)";
        return "hsl("+40+20*this._amount+",100%,50%)";
    }
    getLastHitBall(){
        return this._lastHitBall;
    }
    setLastHitBall(value){
        this._lastHitBall=value;
    }
    createBlock(){
        this._container=new createjs.Container();
        this._block=new createjs.Shape();
        this._text=new createjs.Text(this._amount,"20px Arial","red");
        this._block.graphics.setStrokeStyle(this._strokeWidth,"round").beginStroke(this.changeColor());
        this._block.graphics.drawRect(0,0,this._size,this._size);
        this._text.x=this._size/2-10;
        this._text.y=this._size/2-10;
        this._container.addChild(this._block,this._text);
        this._container.x=this._poiX;
        this._container.y=this._poiY;
    }
    getBlock(){
        return this._container;
    }
    getRect(){
        return this._block;
    }
    minusText(){
        this._amount--;
        this._text.text=this._amount;
        this.changeColor();
    }
    getPoiX(){
        return this._poiX;
    }
    getPoiY(){
        return this._poiY;
    }
    getText(){
        return this._amount;
    }
    static getColor(num){
        
    }
}