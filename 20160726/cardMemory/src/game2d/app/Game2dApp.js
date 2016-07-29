/**
 * Created by 87676 on 7/26/2016.
 */
import Container from "game2d/display/Container";
class Game2dApp extends Container{
    constructor(stageWidth,stageHeight){
        super();
        
        this._canvas=document.createElement("canvas");
        this._canvas.width=stageWidth;
        this._canvas.height=stageHeight;
        this._context2d=this._canvas.getContext("2d");
        this.render(0);
        this.addNativeListeners();
        
    }
    getStageWidth(){
        return this._stageWidth;
    }
    getStageHeight(){
        return this._stageHeight;
    }
    addNativeListeners() {
        this._canvas.onclick = function (event) {
            this.internal_onClick(event);
        }.bind(this);
    }
    getDom(){
        return this._canvas;
    }
    render(time){
        this._context2d.clearRect(0,0,this._stageWidth,this._stageHeight);
        this.internal_draw(this._context2d);
        requestAnimationFrame(this.render.bind(this));
    }
}
export default Game2dApp;