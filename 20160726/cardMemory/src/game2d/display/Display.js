/**
 * Created by 87676 on 7/26/2016.
 */
import Game2dEventDispatcher from "game2d/event/Game2dEventDispatcher";
import Game2dMouseEvent from "game2d/event/Game2dMouseEvent";

class Display extends Game2dEventDispatcher{
    constructor(){
        super();
        this.x=0;
        this.y=0;
        this.scaleX=1;
        this.scaleY=1;
        this.rotation=0;
        
        this._enabled=true;
        this._parent=null;
    }
    onDraw(context2d){}
    internal_draw(context2d){
        context2d.save();
        context2d.translate(this.x,this.y);
        context2d.scale(this.scaleX,this.scaleY);
        context2d.rotate(this.rotation);
        this.onDraw(context2d);
        context2d.restore();
    }
    /**
     * @param {number} globalX
     * @param {number} globalY
     * @return {boolean}
     */
    hitTestPoint(globalX, globalY) {
        return false;
    }

    getGlobalX() {
        var parent = this.getParent();
        if (parent) {
            return parent.getGlobalX() + this.x;
        } else {
            return 0;
        }
    }

    getGlobalY() {
        var parent = this.getParent();
        if (parent) {
            return parent.getGlobalY() + this.y;
        } else {
            return 0;
        }
    }

    /**
     * @param nativeEvent
     */
    internal_onClick(nativeEvent) {
        if (this.isEnabled() && this.hitTestPoint(nativeEvent.layerX, nativeEvent.layerY)) {
            this.dispatchEvent(new Game2dMouseEvent(Game2dMouseEvent.CLICK));
        }
    }

    /**
     *
     * @param {Boolean} value
     */
    setEnabled(value) {
        this._enabled = value;
    }

    /**
     * @return {Boolean|*|boolean}
     */
    isEnabled() {
        return this._enabled;
    }

    setParent(value) {
        this._parent = value;
    }

    getParent() {
        return this._parent;
    }
}
export default Display;