/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    function Picture(item1,item2) {
        var str = "<div class=\"d_container\"> " +
            "<div class=\"d_pic\" style=\'background-image: url("+item1+")\'></div>" +
            "<div class=\"d_pic dPicBack\" style=\'background-image:url("+item2+")\'></div>" +
            "</div>";
        return str;
    }
    window.Picture=Picture;
})();