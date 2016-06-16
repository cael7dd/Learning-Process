/**
 * Created by 87676 on 2016/6/13.
 */
(function () {
    var aData = [[2, "张一", 20], [1, "王二", 30], [3, "李三", 40], [4, "陈四", 50], [8, "赵五", 60], [7, "孙六", 70],
        [6, "周七", 80], [5, "吴八", 90], [9, "郑九", 100]];
    var oTable = document.getElementById("t_container");
    var bm = [false, false, false];
    var oNum, oName, oScore;
    (function show() {
        var trh = document.createElement("tr");
        oNum = document.createElement("th");
        oNum.innerHTML = "学号";
        oName = document.createElement("th");
        oName.innerHTML = "姓名";
        oScore = document.createElement("th");
        oScore.innerHTML = "分数";
        trh.appendChild(oNum);
        trh.appendChild(oName);
        trh.appendChild(oScore);
        trh.style.cursor = "default";
        oTable.appendChild(trh);
        for (var i = 0; i < aData.length; i++) {
            var tr = document.createElement("tr");
            tr.className = "tr_data";
            tr.style.cursor="default";
            for (var j = 0; j < 3; j++) {
                var td = document.createElement("td");
                td.innerHTML = aData[i][j];
                tr.appendChild(td);
            }
            oTable.appendChild(tr);
        }
        var oTrs=document.getElementsByClassName("tr_data");
        for(i=0;i<aData.length;i++){
            (function (m) {
                oTrs[m].onmouseover=function () {
                    this.style.backgroundColor="#f40";
                    this.style.color="white";
                };
                oTrs[m].onmouseout=function () {
                    this.style.backgroundColor="white";
                    this.style.color="black";
                };
            })(i);
        }
        oNum.onclick = function () {
            resort(0);
            oNum.style.backgroundColor = "gray";
            oScore.style.backgroundColor = "white";
        };
        oScore.onclick = function () {
            resort(2);
            oNum.style.backgroundColor = "white";
            oScore.style.backgroundColor = "gray";
        };
        function resort(m) {
            if (bm[m]) {
                aData.sort(function (a, b) {
                    return a[m] > b[m];
                });
                bm[m] = false;
            }
            else {
                aData.sort(function (a, b) {
                    return a[m] < b[m];
                });
                bm[m] = true;
            }
            oTable.innerHTML = "";
            show();
        }
    })();
})();