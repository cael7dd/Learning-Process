/**
 * Created by 87676 on 7/6/2016.
 */
(function () {
    function Main() {
        var divs=$("div");
        var colors=[];
        var backColors=[];
        for(var i=0;i<divs.length;i++){
            colors.push($(divs[i]).css("background-color"));
            backColors.push(randomColor());
            (function (m) {
                $(divs[i]).on("mouseover",function () {
                    $(this).flipToggle(colors[m],backColors[m],1000);
                })
            })(i);
        }
    }
    function randomColor() {
        return "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
    }
    new Main();
})();