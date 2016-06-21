/**
 * Created by 87676 on 2016/6/21.
 */
window.createMenu=window.createMenu||{};
(function () {
    function main() {
        var obj1=document.getElementById("d_1");
        obj1.useCustomMenu=true;
        obj1.customMenu.appendChild(new createMenu.CreateItem("百度",function () {
            window.location.href="http://baidu.com";
        }).item);
        obj1.customMenu.appendChild(new createMenu.CreateItem("yes",function () {
            console.log("yes");
        }).item);
        var obj2=document.getElementById("d_2");
        obj2.useCustomMenu=true;
        obj2.customMenu.appendChild(new createMenu.CreateItem("淘宝",function () {
            window.location.href="http://taobao.com";
        }).item);
    }
    main();
})();