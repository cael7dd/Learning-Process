/**
 * Created by 87676 on 7/26/2016.
 */
class Game2dEvent {
    constructor(type,data){
        this._type=type;
        this._data=data;
    }
    getType(){
        return this._type;
    }
    getData(){
        return this._data;
    }
}
export  default Game2dEvent;