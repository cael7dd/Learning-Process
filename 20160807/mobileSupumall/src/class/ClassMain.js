/**
 * Created by 87676 on 8/4/2016.
 */
(function () {
    function ClassMain() {
        this.initBox();
        this.getClass();
        this.addSearchBtnFunc();
    }
    ClassMain.prototype.getClass=function () {
        var self=this;
        $.ajax({url:"http://datainfo.duapp.com/shopdata/getclass.php",success:function (data) {
            var temp=JSON.parse(data);
            self.createClassBlock(temp);
        }});
    };
    ClassMain.prototype.addSearchBtnFunc=function () {
        var input=document.querySelector("#search");
        var button=document.querySelector("#btnSearch");
        button.addEventListener("touchstart",function () {
            if(input.value){
                window.location.href="../search/index.html?selectText="+input.value+"#";
            }
        });
    };
    ClassMain.prototype.createClassBlock=function (data) {

        var container=document.querySelector("#bodyItem");
        for(var i=0;i<data.length;i++){
            var url="../classdetail/index.html?classID="+data[i].classID+"#";
            container.innerHTML+=" <a href=\""+url+"\" class=\"a_classBlock\" style='background:"+this.getRandomColor()+"'>"+data[i][1]+"</a>";
        }
    };
    ClassMain.prototype.getRandomColor=function () {
        var temp=Math.round(Math.random()*16777215).toString(16);
        for(;temp.length<6;){
            temp+="0";
        }
        return "#"+temp;
    };
    ClassMain.prototype.initBox=function () {
        document.body.style.height=window.innerHeight+"px";
    };
    new ClassMain();
})();