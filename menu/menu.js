(function () {
    function createMenu(oDiv) {
        this.board = oDiv;
        this.createList = function () {
            var oDivList = document.createElement("div");
            oDivList.id = "d_menu";
            for (var i = 0; i < 9; i++) {
                var str = "<a href=\"#\" class=\"a_menu\">第" + (i + 1) + "种颜色</a>";
                oDivList.innerHTML += str;
            }
            return oDivList;
        };
        var randomColor = [];
        for (var i = 0; i < 9; i++) {
            randomColor[i] = "rgba(" + parseInt(Math.random() * 255) + "," +
                parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," +
                Math.random() + ")";
        }
        this.Color = randomColor;
        this.addRandomColor = function () {
            var that=this;
            var lists = document.getElementsByClassName("a_menu");
            for(var i=0;i<lists.length;i++){
                lists[i].onclick=function (m) {
                    return function () {
                        that.board.style.background=that.Color[m];
                        console.log(that.Color[m]);
                    }
                }(i);
            }
        };
    }
    createMenu.prototype.stopRight = function () {
        var oDivList = this.createList();
        document.body.appendChild(oDivList);
        this.addRandomColor();
        this.board.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            oDivList.style.left = event.clientX + "px";
            oDivList.style.top = event.clientY + "px";
            oDivList.style.display = "block";
            console.log(event.clientX);
        });
        window.addEventListener("click", function (event) {
            oDivList.style.display = "none";
        });
    };
    function init() {
        var oDiv = document.getElementById("d_container");
        var obj = new createMenu(oDiv);
        obj.stopRight();
    }
    init();
})();