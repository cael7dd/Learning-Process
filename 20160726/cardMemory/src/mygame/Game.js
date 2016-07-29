/**
 * Created by 87676 on 7/26/2016.
 */
import Game2dApp from "game2d/app/Game2dApp";
import Rect from "game2d/display/Rect";
import Text from "game2d/display/Text";
import Container from "game2d/display/Container";
import Game2dMouseEvent from "game2d/event/Game2dMouseEvent";
class Game extends Game2dApp{
    constructor(){
        super(450,450);
        document.body.appendChild(this.getDom());
        this.createRectAndText();
    }
    createRectAndText(){
        this._poi=[];
        this._container=new Container();
        this._container1=new Container();
        for(let i=0;i<9;i++){
            var rect=new Rect(50,50,this.returnRandomColor());
            var text=new Text(i+1,20);
            text.setFontColor("#000000");
            var poi=this.getRandomPoi();
            rect.x=poi[0]*50;
            rect.y=poi[1]*50;
            text.x=poi[0]*50+18;
            text.y=poi[1]*50+15;
            this._container.addChild(rect);
            this._container1.addChild(text);
        }
        this.addChild(this._container);
        this.addChild(this._container1);
        this.addChildEvent();
    }
    addChildEvent(){
        var self=this;
        var change=true;
        var start=0;
        for(let i=0;i<self._container._children.length;i++){
            (function (m) {
                var rect=self._container._children[m];
                rect.addEventListener(Game2dMouseEvent.CLICK,function (event) {
                    if(change){
                        for(let i=0;i<self._container._children.length;i++){
                            if(self._container._children[i].setColor){
                                self._container._children[i].setColor("#000");
                            }
                        }
                        change=false;
                        return;
                    }
                    if(m==start){
                        start++;
                        rect.setColor("#fff");
                        if(start==9){
                            alert("success");
                        }
                    }
                });
            })(i);
        }
    }
    getRandomPoi(){
        x=parseInt(Math.random()*9);
        y=parseInt(Math.random()*9);
        for(let i=0;i<this._poi.length;i++){
            if(this._poi[i].x==x&&this._poi[i].y==y){
                this.getRandomPoi();
            }else{
                this._poi.push({x:x,y:y});
                return [x,y];
            }
        }
        return [x,y];
    }
    returnRandomColor(){
        var str="#";
        for(var i=0;i<3;i++){
            var temp=parseInt(Math.random()*255).toString(16);
            if(!temp[1]){
                temp="0"+temp;
            }
            str+=temp;
        }
        return str;
    }
}
new Game();
export default Game;