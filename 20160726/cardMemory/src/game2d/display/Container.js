/**
 * Created by 87676 on 7/26/2016.
 */
import Display from "game2d/display/Display";
class Container extends Display{
    constructor(){
        super();
        this._children=[];
    }
    addChild(child){
        var index=this._children.indexOf(child);
        if(index==-1){
            this._children.push(child);
            child.setParent(this);
        }else{
            console.error("this child has exist");
        }
    }
    removeChild(child){
        var index=this._children.indexOf(child);
        this._children.splice(index,1);
        child.setParent(null);
    }

    onDraw(context2d) {
        for(let i=0;i<this._children.length;i++){
            this._children[i].internal_draw(context2d);
        }
    }
    internal_onClick(nativeEvent) {
        for (let i = 0; i < this._children.length; i++) {
            this._children[i].internal_onClick(nativeEvent);
        }
    }
}
export default Container;