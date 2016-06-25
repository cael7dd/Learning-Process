/**
 * Created by 87676 on 2016/6/25.
 */
window.ucai=window.ucai||{};
(function () {
    function SongList(file,container) {
        this._file=file;
        this._container=container;
        this.createListItem();
    }
    SongList.prototype.createListItem=function () {
        var nodeItem=document.createElement("div");
        nodeItem.className="d_item";
        nodeItem.innerHTML=this._file.name;
        this._container.appendChild(nodeItem);
        nodeItem.onclick=function () {
            if(this.onSelect){
                this.onSelect(this._file);
            }
        }.bind(this);
    };
    Object.defineProperty(SongList.prototype,"onSelect",{
        get:function () {
            return this._onSelect;
        },
        set:function (value) {
            this._onSelect=value;
        }
    });
    ucai.SongList=SongList;
})();