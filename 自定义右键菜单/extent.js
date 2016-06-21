/**
 * Created by 87676 on 2016/6/21.
 */
window.createMenu = window.createMenu || {};
(function () {
    Object.defineProperties(HTMLElement.prototype, {
        useCustomMenu: {
            get: function () {
                return this._useCustomMenu;
            },
            set: function (value) {
                this._useCustomMenu = value;
                if (value) {
                    this.customMenu=new createMenu.CreateMenu().menu;
                    document.body.appendChild(this.customMenu);
                    this.oncontextmenu = function (event) {
                        event.preventDefault();
                        this.customMenu.style.left = event.clientX + "px";
                        this.customMenu.style.top = event.clientY + "px";
                        this.customMenu.style.display = "block";
                        document.onmouseup = function () {
                            this.customMenu.style.display = "none";
                            document.onmouseup = null;
                        }.bind(this);
                    }
                }
            }
        }

    })
})();