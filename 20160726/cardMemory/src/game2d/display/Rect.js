/**
 * Created by 87676 on 7/26/2016.
 */
import Display from "game2d/display/Display";
class Rect extends Display{
    constructor(width,height,color){
        super();
        this._width=width||100;
        this._height=height||100;
        this._color=color||"#000";
    }
    getWidth(){
        return this._width;
    }
    setWidth(value){
        this._width=value;
    }
    getHeight(){
        return this._height;
    }
    setHeight(value){
        this._height=value;
    }
    getColor(){
        return this._color;
    }
    setColor(value){
        this._color=value;
    }
    onDraw(context2d){
        context2d.fillStyle=this._color;
        context2d.fillRect(0,0,this._width,this._height);
    }
    hitTestPoint(globalX, globalY) {
        return globalX > this.getGlobalX() &&
            globalY > this.getGlobalY() &&
            globalX < this.getGlobalX() + this._width &&
            globalY < this.getGlobalY() + this._height;
    }

}
export default Rect;