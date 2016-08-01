/**
 * Created by 87676 on 8/1/2016.
 */
class Block{
    _block;_x;_y;_img;_width;_height;
    constructor(img,width,height,x,y,container){
        this._img=img;
        this._x=x;
        this._y=y;
        this._width=width;
        this._height=height;
        this._block=document.createElement("div");
        this._block.className="block";
        this._block.style.width=this._width+"px";
        this._block.style.height=this._height+"px";
        container.appendChild(this._block);
        this.createBlock();
    }
    createBlock(){
        this._block.style.background=`url('${this._img}') no-repeat ${-this._x*this._width}px ${-this._y*this._height}px`;
        this._block.style.backgroundSize="600px 400px";
    }
    getBlock(){
        return this._block;
    }
    
    setImg(img){
        this._img=img;
        this._block.style.backgroundImage=`url('${this._img}')`;
    }
}