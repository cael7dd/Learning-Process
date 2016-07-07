/**
 * Created by 87676 on 7/6/2016.
 */
(function () {
    function flipCard() {
        $.fn.flipToggle = function (fC, bC, duration) {
            var obj = $(this);
            console.log(this[0].doing);
            var width = obj.css("width");
            var color;
            var temp=obj.css("background-color");
            obj.css("background",bC);
            var backColor=obj.css("background-color");
            obj.css("background",fC);
            var fontColor=obj.css("background-color");
            obj.css("background-color",temp);
            (obj.css("background-color") == fontColor) ? color=backColor : color=fontColor;
            obj.animate({width: "0px", margin:"0 "+ parseInt(width) / 2 + "px",backgroundImage:"linear-gradient(to right,#000,#fff)"}, duration / 2, function () {
                obj.css("background-color", color);
                obj.animate({width: width, margin: "0px"}, duration / 2, function () {
                });
            });
            this[0].doing=false;
            console.log(this[0]);
        };
    }
    flipCard();
})();