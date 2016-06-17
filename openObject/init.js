/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    function init() {
        var pictures=["pic/1.jpg","pic/2.jpg","pic/3.jpg","pic/4.jpg","pic/5.jpg","pic/6.jpg",
            "pic/7.jpg","pic/8.jpg","pic/9.jpg","pic/10.jpg","pic/11.jpg","pic/12.jpg","pic/13.jpg","pic/14.jpg"];
        var str="";
        for(var i=0;i<pictures.length;i++){
            str+=Picture(pictures[i],pictures[++i]);
        }
        document.body.innerHTML=str;
    }
    init();
})();