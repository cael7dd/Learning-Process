/**
 * Created by 87676 on 7/8/2016.
 */
(function () {
    function Main() {
        var btn=$(".btn");
        var dialog=$(".dialog");
        var video=$("#video");
        dialog.css({display:"none"});
        btn.button();
        dialog.on("dialogclose",function () {
            video[0].pause();
        });
        btn.on("click",function () {
            dialog.dialog({width:890});
            video[0].play();
        });
    }
    Main();
})();