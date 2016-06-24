/**
 * Created by 87676 on 2016/6/21.
 */
window.createMenu=window.createMenu||{};
(function () {
    function CreateMenu() {
        this.menu=document.createElement("div");
        this.menu.style.position="fixed";
        this.menu.style.background="white";
        this.menu.style.display="none";
    }
    createMenu.CreateMenu=CreateMenu;
})();