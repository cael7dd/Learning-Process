/**
 * Created by 87676 on 2016/6/24.
 */
window.ucai = window.ucai || {};
(function () {
    function ClassifyData(data) {
        this.parttenLine=/(.*)\s+/g;
        this.parttenClassName = /\[(.*)\]/;
        this.parttenItemName = /(.*)=(.*)/;
        this.obj = {};
        var temp;
        while (true) {
            var lineResult = this.parttenLine.exec(data);
            if (!lineResult) {
                break;
            }
            var classResult=this.parttenClassName.exec(lineResult[1]);
            if(classResult){
                this.obj[classResult[1]]={};
                temp=classResult[1];
            }
            else{
                var itemResult=this.parttenItemName.exec(lineResult[1]);
                this.obj[temp][itemResult[1]]=itemResult[2];
            }
        }
    }
    ucai.classifyData = ClassifyData;
})();