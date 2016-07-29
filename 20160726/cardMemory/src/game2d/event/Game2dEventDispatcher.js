/**
 * Created by 87676 on 7/26/2016.
 */
class Game2dEventDispatcher{
    constructor(){
        this._listeners=new Map();
    }
    addEventListener(type,func){
        var listeners=this._listeners.get(type);
        if(!listeners){
            listeners=[];
            this._listeners.set(type,listeners);
        }
        listeners.push(func);
    }
    removeEventListeners(type,func){
        var listeners=this._listeners.get(type);
        if(listeners){
            if(func){
                var index=listeners.indexOf(func);
                if(index!=-1){
                    listeners.splice(index,1);
                }
            }else{
                listeners.length=0;
            }
           
        }
    }
    dispatchEvent(event){
        var listeners=this._listeners.get(event.getType());
        if(listeners&&listeners.length>0){
            for(let i=0;i<listeners.length;i++){
                listeners[i](event);
            }
        }
    }
}
export default Game2dEventDispatcher;