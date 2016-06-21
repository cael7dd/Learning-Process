/**
 * Created by 87676 on 2016/6/21.
 */
(function () {
    function main() {
        this.div1=document.getElementById("d_1");
        this.div1.useCustomContextMenu=true;
    }
    new main();
    document.getElementById("a_1").useCustomContextMenu=false;
})();