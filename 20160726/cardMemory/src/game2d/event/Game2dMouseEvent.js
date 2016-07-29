/**
 * Created by 87676 on 7/26/2016.
 */
import Game2dEvent from "game2d/event/Game2dEvent";
class Game2dMouseEvent extends Game2dEvent{
    constructor(type,data){
        super(type,data);
    }
}
Game2dMouseEvent.CLICK="click";
export default Game2dMouseEvent;