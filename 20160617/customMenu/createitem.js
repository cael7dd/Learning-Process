/**
 * Created by 87676 on 2016/6/21.
 */
window.createMenu=window.createMenu||{};
(function () {
    function CreateItem(name,func) {
        this.item=document.createElement("a");
        this.item.innerHTML=name;
        this.item.style.display="block";
        this.item.href="#";
        if(func){
            this.item.onclick=func;
        }
    }
    createMenu.CreateItem=CreateItem;
})();

