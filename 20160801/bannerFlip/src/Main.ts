/**
 * Created by 87676 on 8/1/2016.
 */
class Main{
    _container;_imgPath;_currentIndex;_btnLeft;_btnRight;_blocks=[];_pieceNum;_busy;_animationDuration;
    _delay;_imgWidth;_imgHeight;_intervalId;
    constructor(){
        this._container=document.querySelector("#d_container");
        this._imgPath=["../img/a (1).jpg","../img/a (2).jpg","../img/a (3).jpg","../img/a (4).jpg",
            "../img/a (5).jpg","../img/a (6).jpg","../img/a (7).jpg","../img/a (8).jpg","../img/a (9).jpg"];
        this._currentIndex=0;
        this._busy=false;

        this._pieceNum=5;
        this._animationDuration=1;
        this._delay=0.04;

        this._imgWidth=600/this._pieceNum;
        this._imgHeight=400/this._pieceNum;
        this._btnLeft=document.querySelector("#d_left");
        this._btnRight=document.querySelector("#d_right");
        this.addImg();
        this.addListeners();
        this.interval();
    }
    addImg(){
        for(let i=0;i<this._pieceNum;i++){
            for(let j=0;j<this._pieceNum;j++){
                var temp=new Block(this._imgPath[this._currentIndex],this._imgWidth,this._imgHeight,j,i,this._container);
                this._blocks.push(temp);
            }
        }
    }
    interval(){
        this._intervalId=setInterval(this.addAnimation.bind(this,true),4000);
    }
    addListeners(){
        this._btnLeft.addEventListener("click",()=>{
            if(!this._busy){
                this._busy=true;
                this.addAnimation(false);
            }
        });
        this._btnRight.addEventListener("click",()=>{
            if(!this._busy){
                this._busy=true;
                this.addAnimation(true);
            }
        });
    }
    judgeIndex(){
        (this._currentIndex<0)?this._currentIndex=this._imgPath.length-1:null;
        (this._currentIndex==this._imgPath.length)?this._currentIndex=0:null;
    }
    addAnimation(next){
        var self=this;
        (next)?this._currentIndex++:this._currentIndex--;
        this.judgeIndex();
        for(let i=0;i<this._blocks.length;i++){
            this._blocks[i].getBlock().style.animation=`next ${this._animationDuration}s ease ${this._delay*i}s forwards`;
            (function (m) {
                setTimeout(()=>{
                    self._blocks[m].setImg(self._imgPath[self._currentIndex]);
                    self._blocks[m].getBlock().style.animation=`last ${self._animationDuration}s ease forwards`;
                },(self._delay*m+self._animationDuration)*1000)
            })(i);
        }
        setTimeout(()=>{
            this._busy=false;
        },(this._delay*this._blocks.length+this._animationDuration)*1000);
    }
}
new Main();