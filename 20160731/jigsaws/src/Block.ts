/**
 * Created by 87676 on 7/29/2016.
 */
class Block{
    _img;_size;_poiX;_poiY;_block;_x;_y;_originX;_originY;isRight;
    constructor(img,size,x,y){
        this._img=img;
        this._size=size;
        this.isRight=true;
        this._originX=this._x=x;
        this._originY=this._y=y;
        this._poiX=x*this._size;
        this._poiY=y*this._size;
        this.createBlock();
    }
    createBlock(){
        this._block=new createjs.Bitmap(this._img);
        var imgBound=this._block.getBounds();
        var scale,x=0,y=0;
        if(imgBound.width>=imgBound.height){
            scale=500/imgBound.height;
            x=(imgBound.width-500)/2*scale;
        }else{
            scale=500/imgBound.width;
            y=(imgBound.height-500)/2*scale;
        }
        x+=this._poiX/scale;
        y+=this._poiY/scale;
        this._block.sourceRect=new createjs.Rectangle(x,y,this._size/scale,this._size/scale);
        this._block.scaleX=scale;
        this._block.scaleY=scale;
        this._block.x=this._poiX;
        this._block.y=this._poiY;
    }
    getBlock(){
        return this._block;
    }
    getX(){
        return this._x;
    }
    getY(){
        return this._y;
    }
    getOriginX(){
        return this._originX;
    }
    getOriginY(){
        return this._originY;
    }
    setX(value){
        this._x=value;
        this._block.x=this._x*this._size;
    }
    setY(value){
        this._y=value;
        this._block.y=this._y*this._size;
    }
    
}