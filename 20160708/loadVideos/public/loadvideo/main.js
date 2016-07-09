/**
 * Created by 87676 on 7/8/2016.
 */
var config={callback:"LoadVideo"};
window[config.callback]=function (result) {
    console.log(result);
    document.querySelector("#video").src=result;
};
var scr=document.createElement("script");
scr.src="http://localhost:3000/loadvideos?cb="+config.callback;
document.body.appendChild(scr);
(function () {
    function Main() {
        var btn = $(".btn");
        var dialog = $(".dialog");
        var video = $("#video");
        dialog.dialog({
            width: 890,
            autoOpen: false,
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            }
        });
        btn.button();
        dialog.on("dialogclose", function () {
            video[0].pause();
        });
        btn.on("click", function () {
            dialog.dialog("open");
            video[0].play();
        });
    }

    Main();
})();