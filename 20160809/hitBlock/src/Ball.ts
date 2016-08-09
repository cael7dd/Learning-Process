/**
 * Created by 87676 on 8/8/2016.
 */
class Ball{
    _x;_y;_size;_ball;_speed;_angle;_stepX;_stepY;_fallen;_id;
    constructor(x,y,size,speed,angle,id){
        this._x=x;
        this._y=y;
        this._size=size;
        this._speed=speed;
        this._angle=angle;
        this._id=id;
        this._stepX=this._speed*Math.cos(this._angle);
        this._stepY=this._speed*Math.sin(this._angle);
        this._fallen=false;
        this.createBall();
    }
    createBall(){
        this._ball=new createjs.Shape();
        this._ball.graphics.beginFill("#fff");
        this._ball.graphics.drawCircle(0,0,this._size);
        this._ball.graphics.endFill();
        this._ball.x=this._x;
        this._ball.y=this._y;
        this._ball.addEventListener("tick",this.moveBall.bind(this));
    }
    moveBall(){
        this._ball.x+= this._stepX;
        this._ball.y-= this._stepY;
        this.judgeHit();
    }
    judgeHit(){
        if(this._ball.x<=this._size||this._ball.x>=window.innerWidth-this._size){
            this._angle=Math.PI-this._angle;
            this.adjustStep();
        }
        if(this._ball.y<=this._size){
            this._angle=-this._angle;
            this.adjustStep();
        }
        if(this._ball.y>=window.innerHeight+this._size+2){
            this._fallen=true;
            this._ball.removeAllEventListeners("tick");
        }
    }
    getID(){
        return this._id;
    }
    adjustStep(){
        this._stepX=this._speed*Math.cos(this._angle);
        this._stepY=this._speed*Math.sin(this._angle);
    }
    getX(){
        return this._ball.x;
    }
    getY(){
        return this._ball.y;
    }
    setAngle(isVertical){
        if(isVertical){
            this._angle=Math.PI-this._angle;
        }else{
            this._angle=-this._angle;
        }
        this.adjustStep();
    }
    isFallen(){
        return this._fallen;
    }
    getBall(){
        return this._ball;
    }
}