/**
 * Created by 87676 on 2016/6/22.
 */
window.testSystem=window.testSystem||{};
(function () {
    function CreateSystem(dataName,dataPath) {
        this.dataName=dataName;
        this.dataPath=dataPath;
        this.questionNumber=0;
        this.rightNumber=0;
        this.doneNumber=0;
        this.wrongNumber=0;
        this.numberToItem=["a","b","c","d"];
        this.itemToNumber={a:0,b:1,c:2,d:3};
    }
    CreateSystem.prototype.getData=function () {
        $.get(this.dataPath+this.dataName).done(function (data) {
            this.data=data;
            this.start();
        }.bind(this));
    };
    CreateSystem.prototype.getHTML=function () {
        var str="<div id=\"d_border\">"+
            "<div id=\"d_question\">"+
        "<div id=\"d_titleContainer\">"+
        "   <div id=\"d_questionNumber\"></div>"+
        "   <div id=\"d_title\"></div>"+
        "   </div>"+
        "   <div class=\"d_item\">"+
        "   <input type=\"radio\" id=\"itemA\" name=\"item\"/>"+
        "   <label class=\"l_itemText\" for=\"itemA\"></label>"+
        "   </div>"+
        "   <div class=\"d_item\">"+
        "   <input type=\"radio\" id=\"itemB\" name=\"item\"/>"+
        "   <label class=\"l_itemText\" for=\"itemB\"></label>"+
        "   </div>"+
        "   <div class=\"d_item\">"+
        "   <input type=\"radio\" id=\"itemC\" name=\"item\"/>"+
        "   <label class=\"l_itemText\" for=\"itemC\"></label>"+
        "   </div>"+
        "   <div class=\"d_item\">"+
        "   <input type=\"radio\" id=\"itemD\" name=\"item\"/>"+
        "   <label class=\"l_itemText\" for=\"itemD\"></label>"+
        "   </div>"+
        "   <div class=\"d_item\" id=\"d_answer\"></div>"+
        "   <div id=\"d_btn\">"+
        "   <div id=\"d_lastOne\" class=\"d_lastNext\">上一题</div>"+
        "   <div id=\"d_nextOne\" class=\"d_lastNext\">下一题</div>"+
        "   <div class=\"d_lastNext\" id=\"d_description\">本题解释</div>"+
        "   </div>"+
        "   </div>"+
        "   <div id=\"d_statistics\">"+
        "   <div class=\"d_staItem\" id=\"d_check\">"+
        "   <input id=\"ipt_checkbox\" type=\"checkbox\"  />"+
        "   <label for=\"ipt_checkbox\">自动跳转至下一题</label>"+
        "   </div>"+
        "   <div class=\"d_staItem\">答对："+
        "<span id=\"s_rightNumber\"></span>题"+
        "  </div>"+
        "   <div class=\"d_staItem\">答错："+
        "<span id=\"s_wrongNumber\"></span>题"+
        "   </div>"+
        "   <div class=\"d_staItem\">正确率："+
        "<span id=\"s_accuracy\"></span>"+
        "   </div>"+
        "   <div class=\"d_staItem\">跳转到第"+
        "   <input  id=\"iptJump\"/>题"+
        "   </div>"+
        "   </div>"+
        "   <div id='d_descriptionText'></div></div>";
        document.body.innerHTML=str;
        this._NodeQuestionNumber=document.getElementById("d_questionNumber");
        this._NodeQuestionTitle=document.getElementById("d_title");
        this._NodeItemRadio=document.getElementsByName("item");
        this._NodeItems=document.getElementsByClassName("l_itemText");
        this._NodeAnswer=document.getElementById("d_answer");
        this._NodeLastOne=document.getElementById("d_lastOne");
        this._NodeNextOne=document.getElementById("d_nextOne");
        this._NodeDescription=document.getElementById("d_description");
        this._NodeCheckBox=document.getElementById("ipt_checkbox");
        this._NodeRinghtNumber=document.getElementById("s_rightNumber");
        this._NodeWrongNumber=document.getElementById("s_wrongNumber");
        this._NodeAccuracy=document.getElementById("s_accuracy");
        this._NodeIptJump=document.getElementById("iptJump");
        this._NodeDescriptionText=document.getElementById("d_descriptionText");
    };
    CreateSystem.prototype.changeQuestionHTML=function () {
        this._NodeQuestionTitle.innerHTML=this.data[this.questionNumber].title;
        for(var i=0;i<this._NodeItems.length;i++){
            this._NodeItems[i].innerHTML=this.numberToItem[i].toUpperCase()+":"+this.data[this.questionNumber][this.numberToItem[i]];
        }
        this._NodeQuestionNumber.innerHTML=this.questionNumber+1+"/"+this.data.length;
        this._NodeRinghtNumber.innerHTML=this.rightNumber;
        this._NodeWrongNumber.innerHTML=this.wrongNumber;
        this._NodeAccuracy.innerHTML=((isNaN(((this.rightNumber/this.doneNumber)*100).toFixed(2)))?0:((this.rightNumber/this.doneNumber)*100).toFixed(2))+"%";
        this._NodeDescriptionText.innerHTML=this.data[this.questionNumber].description;
    };
    CreateSystem.prototype.itemSelect=function () {
        var rightNumber=this.itemToNumber[this.data[this.questionNumber].right];
        for(var i=0;i<this._NodeItems.length;i++){
            this._NodeItemRadio[i].disabled="";
            this._NodeItemRadio[i].checked="";
        }
        for( i=0;i<this._NodeItems.length;i++){

            this._NodeItemRadio[i].onclick=function (m) {
                return function () {
                    if(m==rightNumber){
                        this.rightNumber++;
                        this.judgeAnswer=1;
                    }
                    else{
                        this.wrongNumber++;
                        this.judgeAnswer=0;
                    }
                    this.doneNumber++;
                    eventJudgeAnswer.call(this);
                    this.changeQuestionHTML();
                    for(var i=0;i<this._NodeItems.length;i++){
                        this._NodeItemRadio[i].disabled="disabled";
                    }
                }.bind(this)
            }.call(this,i);
        }
        function eventJudgeAnswer() {
            if(this.judgeAnswer==1){
                this._NodeAnswer.innerHTML="恭喜你，答对了！";
                this._NodeAnswer.style.background="#a8e1a1";
                this._NodeAnswer.style.color="#56b04b";
                if(this._NodeCheckBox.checked==true){
                    setTimeout(this.eventNextQuestion.bind(this),1000);
                }
            }
            else if(this.judgeAnswer==0){
                this._NodeAnswer.innerHTML="答错了！标准答案是："+this.numberToItem[rightNumber].toUpperCase();
                this._NodeAnswer.style.background="#fcbabc";
                this._NodeAnswer.style.color="#fd2200";
            }
        }
    };
    CreateSystem.prototype.eventNextQuestion=function (){
        var temp=this.questionNumber;
        this.questionNumber++;
        this.judgeQuestionNumber();
        if(temp==this.questionNumber){return}
        this.init();
    };
    CreateSystem.prototype.nextQuestion=function () {
        this._NodeNextOne.onclick=this.eventNextQuestion.bind(this);
    };

    CreateSystem.prototype.lastQuestion=function () {
        this._NodeLastOne.onclick=function () {
            var temp=this.questionNumber;
            this.questionNumber--;
            this.judgeQuestionNumber();
            if(temp==this.questionNumber){return}
            this.init();
        }.bind(this);
    };
    CreateSystem.prototype.judgeQuestionNumber=function () {
        if(this.questionNumber>=this.data.length){
            this.questionNumber=this.data.length-1;
            return;
        }
        if(this.questionNumber<0){
            this.questionNumber=0;
        }
    };
    CreateSystem.prototype.getDescription=function () {
        this._NodeDescription.onclick=function (event) {
            this._NodeDescriptionText.style.animation="getIn 0.7s ease forwards";
            event.stopPropagation();
            window.onclick=function () {
                this._NodeDescriptionText.style.animation="getOut 0.7s ease forwards";
            }.bind(this)
        }.bind(this);
    };
    CreateSystem.prototype.getJumpNumber=function () {
        this._NodeIptJump.onblur=function () {
            var value=parseInt(this._NodeIptJump.value);
            if(value&&value>0&&value<=this.data.length){
                this.questionNumber=value-1;
                console.log(value);
                this.init();
            }
        }.bind(this);
    };
    CreateSystem.prototype.autoJump=function () {

    };
    CreateSystem.prototype.start=function () {
        this.getHTML();
        this.init();
    };
    CreateSystem.prototype.init=function () {
        this.judgeAnswer=-1;
        this._NodeAnswer.style="";
        this._NodeAnswer.innerHTML="";
        this.changeQuestionHTML();
        this.itemSelect();
        this.nextQuestion();
        this.lastQuestion();
        this.getDescription();
        this.getJumpNumber();
    };
    testSystem.createSystem=CreateSystem;
})();