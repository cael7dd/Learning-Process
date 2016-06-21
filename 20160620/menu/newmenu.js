/**
 * Created by 87676 on 2016/6/21.
 */
(function () {
    Object.defineProperties(HTMLElement.prototype,{
        useCustomContextMenu:{
            get:function () {
                return this._useCustomContextMenu;
            },
            set: function (value) {
                this._useCustomContextMenu=value;
                if(this._useCustomContextMenu){
                    this.addEventListener("contextmenu",function (event) {
                        event.preventDefault();
                    })
                }
                else{
                    
                }
            }
        }
    })
})();