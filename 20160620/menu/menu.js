(function () {
    function CreateMenu(border) {
        this.border = border;
        this.menu = document.createElement("div");
        this.border.appendChild(this.menu);
        this.menu.className = "d_menu";
        this.judge=function () {
            this.menu.style.display="none";
            bDisplay=false;
        };
        this.contextmenuEvent = function (event) {
            event.preventDefault();
            if (bDisplay) {
                this.judge();
                return;
            }
            this.menu.style.display = "block";
            this.menu.style.left = event.clientX+"px";
            this.menu.style.top = event.clientY+"px";
            bDisplay=true;
            window.addEventListener("mouseup",this.onclickEvent.bind(this));
        };
        this.onclickEvent=function (event) {
            this.judge();
            event.target.removeEventListener("mouseup",arguments.calee);
        };
        this.border.addEventListener("contextmenu", this.contextmenuEvent.bind(this));
        var bDisplay = false;
    }
    function AddList(source,name) {
        this.source=source;
        this.list=document.createElement("a");
        this.list.className="a_menu";
        this.list.href=this.source;
        this.list.target="_blank";
        this.list.innerHTML=name;
        console.log(this.list)
    }
    function init() {
        var oDiv = document.getElementsByClassName("d_container");
        var obj=[];
        for(var i=0;i<oDiv.length;i++){
            obj[i]=new CreateMenu(oDiv[i]);
        }
        obj[0].menu.appendChild((new AddList("http://www.baidu.com","百度")).list);
        obj[0].menu.appendChild((new AddList("http://www.qq.com","QQ")).list);
        obj[0].menu.appendChild((new AddList("http://www.sina.com","新浪")).list);
        obj[0].menu.appendChild((new AddList("http://www.taobao.com","淘宝")).list);
        obj[1].menu.appendChild((new AddList("http://www.163.com","163")).list);
        obj[1].menu.appendChild((new AddList("http://www.jd.com","京东")).list);
    }

    init();
})();