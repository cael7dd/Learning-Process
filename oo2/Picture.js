/**
 * Created by 87676 on 2016/6/17.
 */
window.oo2=window.oo2||{};
(function () {
    function Picture(obj) {
        this.front=obj.front;
        this.back=obj.back;
    }
    Picture.prototype.createPicture=function () {
        var str = "<div class=\"d_container\"> " +
            "<div class=\"d_pic\" style=\'background-image: url("+this.front+")\'></div>" +
            "<div class=\"d_pic dPicBack\" style=\'background-image:url("+this.back+")\'></div>" +
            "</div>";
        return str;
    };
    oo2.Picture=Picture;
})();