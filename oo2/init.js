/**
 * Created by 87676 on 2016/6/17.
 */
window.oo2=window.oo2||{};
(function () {
    function init() {
        var pictures=[
            new oo2.Picture({front:"pic/1.jpg",back:"pic/2.jpg"}),
            new oo2.Picture({front:"pic/3.jpg",back:"pic/4.jpg"}),
            new oo2.Picture({front:"pic/5.jpg",back:"pic/6.jpg"}),
            new oo2.Picture({front:"pic/7.jpg",back:"pic/8.jpg"}),
            new oo2.Picture({front:"pic/9.jpg",back:"pic/10.jpg"}),
            new oo2.Picture({front:"pic/11.jpg",back:"pic/12.jpg"}),
            new oo2.Picture({front:"pic/13.jpg",back:"pic/14.jpg"})];
        var str="";
        pictures.forEach(function (i) {
            str+=i.createPicture();
        });
        document.body.innerHTML=str;
    }
    init();
})();