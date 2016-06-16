/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    var oData=[["qqq",12],["www",22],["eee",52],["ddd",72]];
    var reverse=false,currentTable=true;
    function createTableHead() {
        var oTr=document.createElement("tr");
        var oTh=document.createElement("th");
        oTh.innerHTML="姓名";
        oTr.appendChild(oTh);
        oTh=document.createElement("th");
        oTh.innerHTML="分数";
        oTr.appendChild(oTh);
        oTh.onclick=onclickHandler;
        return oTr;
    }
    function createRow(obj) {
        for(var i=0;i<oData.length;i++){
            var oTr=document.createElement("tr");
            for(var j=0;j<2;j++){
                var oTd=document.createElement("td");
                oTd.innerHTML=oData[i][j];
                oTr.appendChild(oTd);
            }
            obj.appendChild(oTr);
        }
    }
    function onclickHandler() {
        if(reverse) {
            oData.sort(function (a, b) {
                return a.score > b.score;
            });
            reverse=false;
        }
        else{
            oData.reverse();
        }
        init();
    }
    function createTable() {
        var oTable=document.createElement("table");
        oTable.cellSpacing="0";
        oTable.border=1;
        oTable.appendChild(createTableHead());
        document.body.appendChild(oTable);
        return oTable;
    }
    function init() {
        document.body.innerHTML="";
        createRow(createTable());
    }
    init();
})();