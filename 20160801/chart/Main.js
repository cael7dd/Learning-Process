/**
 * Created by 87676 on 8/1/2016.
 */
(function () {
    function Main() {
        this._context=document.querySelector("#canvas").getContext("2d");
        this._data=[10,43,64,21,31,45];
        this._step=Math.PI/100;
        this._count=0;
        this._currentData=0;
        this.amount();
        this._context.save();
        this._startAngle=0;
        this.goneData=this._data[0];
        this._context.fillStyle=this.getRandomColor();
        this.fps=document.querySelector("#fps");
        this.render(0);
        this._lastTime=0;
    }
    Main.prototype.amount=function () {
        var i=0;
        this._data.forEach(function (value) {
            i+=value;
        });
        this._amount=i;
    };
    Main.prototype.drawData=function () {
        if(this._currentData==this._data.length){
            return ;
        }
        this._context.beginPath();
        this._context.moveTo(200,200);
        var angle=this._step*this._count++;
        this._context.arc(200,200,100,this._startAngle,angle);
        this._context.closePath();
        this._context.fill();
        if(angle/(Math.PI*2)>=this.goneData/this._amount){
            this._currentData++;
            this.goneData+=this._data[this._currentData];
            this._context.restore();
            this._context.save();
            this._context.fillStyle="#fff";
            var range=angle-this._startAngle;
            this._context.font="20px Arial";
            this._context.fillText(this._data[this._currentData-1],200+Math.cos(range/2+this._startAngle)*70-10,200+Math.sin(range/2+this._startAngle)*70+10);
            this._context.restore();
            this._context.save();
            this._startAngle=angle;
            this._context.fillStyle=this.getRandomColor();
        }

    };
    Main.prototype.render=function (time) {
        var range=time-this._lastTime;
        this._lastTime=time;
        this.fps.innerHTML=Math.round(1000/range)+"fps";
        this.drawData();
        requestAnimationFrame(this.render.bind(this));
    };
    Main.prototype.getRandomColor=function () {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    };
    new Main();
})();