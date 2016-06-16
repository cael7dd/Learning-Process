/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    function init() {
        for(var i=1;i<7;i++){
            document.body.appendChild(Picture(i).createPicture());
        }
    }
    init();
})();