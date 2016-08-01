/**
 * Created by 87676 on 7/29/2016.
 */
///<reference path="../node_modules/definitively-typed/easeljs/easeljs.d.ts"/>
    
class Main{
    _stage;_imgPath;_level;_blockAmount;_size;_blockArray;_blankX;_blankY;_busy=false;_btnRandom;_random;_iptFile;
    _movedX;_iptLevel;_aniDur;_wrongNum;
    constructor(){
       this.init();
    }
    init(){
        this._btnRandom=document.querySelector("#random");
        this._level=5;
        this._iptLevel=document.querySelector("#d_level");
        this._iptLevel.value=this._level-1;
        this._imgPath="src/1.jpg";
        this._stage=new createjs.Stage("canvas");
        this._iptFile=document.querySelector("#ipt_file");
        this.addImage();
        this.startNewLevel();
    }
    startNewLevel(){
       this._stage.removeAllChildren();
        this._blockArray=[];
        this._random=false;
        this._btnRandom.innerHTML="开始打乱";
        createjs.Ticker.addEventListener("tick",this._stage);
        this._busy=false;
        this._aniDur=200-199/9*(this._level-2);
        this._blockAmount=Math.pow(this._level,2)-1;
        this._wrongNum=0;
        this._size=500/this._level;
        this.addBlocks();
        this._blankX=this._blankY=this._level-1;
        this._movedX=false;
        this.addListeners();
    }
    addBlocks(){
        var jLength=this._level;
        for(let i=0;i<this._level;i++){
            if(i==this._level-1){
                jLength=this._level-1;
            }
            for(let j=0;j<jLength;j++){
                var a=new Block(this._imgPath,this._size,i,j);
                this._blockArray.push(a);
                this._stage.addChild(a.getBlock());
            }
        }
    }
    addImage(){
        var reader=new FileReader();
        this._iptFile.addEventListener("change",(event)=>{
            if(event.target.files[0].type=="image/jpeg"){
                reader.onload=()=>{
                    this._imgPath=reader.result;
                    this.startNewLevel();
                };
               reader.readAsDataURL(event.target.files[0]);
            }
            
        });
    }
    addListeners(){
        var self=this;
        for(let i=0;i<this._blockArray.length;i++){
            (function (m) {
                self._blockArray[m].getBlock().addEventListener("click",function () {
                    if(Math.abs(self._blockArray[m].getX()-self._blankX)*Math.abs(self._blockArray[m].getY()-self._blankY)==0&&
                        Math.abs(self._blockArray[m].getX()-self._blankX)<=1&&
                        Math.abs(self._blockArray[m].getY()-self._blankY)<=1&&!self._busy){
                        self._busy=true;
                        var toX=self._blankX;
                        var toY=self._blankY;
                        self.judgeResult.call(self,self._blockArray[m],toX,toY);
                        createjs.Tween.get(self._blockArray[m].getBlock()).to({x:self._blankX*self._size,y:self._blankY*self._size},300)
                        .call(function () {
                                self._blockArray[m].setX(toX);
                                self._blockArray[m].setY(toY);
                                self._busy=false;
                            },this);
                        self._blankX=self._blockArray[m].getX();
                        self._blankY=self._blockArray[m].getY();
                    }
                });
            })(i);
        }
        this._btnRandom.onclick=()=>{
            if(!this._random){
                this._busy=true;
                this._random=true;
                this._btnRandom.innerHTML="停止打乱";
                this.findNextMove();
            }else{
                this._busy=false;
                this._random=false;
                this._btnRandom.innerHTML="开始打乱";
            }
        };
        this._iptLevel.addEventListener("input",()=>{
            var temp=parseInt(this._iptLevel.value);
            temp=Math.max(0,temp);
            temp=Math.min(10,temp);
            this._iptLevel.value=temp;
        });
        this._iptLevel.addEventListener("blur",()=>{
            this._level=parseInt(this._iptLevel.value)+1;
            this.startNewLevel();
        })
    }
    judgeResult(obj,x,y){
        var rightX=obj.getOriginX();
        var rightY=obj.getOriginY();
        if(x==rightX&&y==rightY&&!obj.isRight){
            this._wrongNum--;
            obj.isRight=true;
        }else if((x!=rightX||y!=rightY)&&obj.isRight){
            this._wrongNum++;
            obj.isRight=false;
        }
        if(!this._random&&this._wrongNum==0){
            alert("恭喜过关！");
        }
    }
    addBlockAnimation(x,y){
        var self=this;
        var temp=this.getNextBlock(this._blankX,this._blankY);
        this.judgeResult.call(this,temp,x,y);
        createjs.Tween.get(temp.getBlock()).to({x:x*this._size,y:y*this._size},this._aniDur)
            .call(function () {
                temp.setX(x);
                temp.setY(y);
                createjs.Tween.removeAllTweens();
                self.findNextMove();
            });
    }
    findNextMove(){
        if(this._random){
            if(!this._movedX){
                this.randomDir("_blankX");
                this._movedX=true;
            }else{
                this.randomDir("_blankY");
                this._movedX=false;
            }
        }else{
            createjs.Tween.removeAllTweens();
        }
       
    }
    randomDir(property){
        if(this[property]-1<0||Math.random()>=0.5&&this[property]+1<this._level){
            this[property]++;
            if(property=="_blankX"){
                this.addBlockAnimation.call(this,this._blankX-1,this._blankY);
            }else{
                this.addBlockAnimation.call(this,this._blankX,this._blankY-1);
            }
            
        }else {
            this[property]--;
            if(property=="_blankX"){
                this.addBlockAnimation(this._blankX+1,this._blankY);
            }else{
                this.addBlockAnimation(this._blankX,this._blankY+1);
            }
        }
    }
    getNextBlock(x,y){
        for(let i=0;i<this._blockArray.length;i++){
            if(this._blockArray[i].getX()==x&&this._blockArray[i].getY()==y){
                return this._blockArray[i];
            }
        }
    }
}
new Main();