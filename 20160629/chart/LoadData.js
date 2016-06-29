/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai=window.ucai||{};
(function () {
    function LoadData(path,callback) {
        this._path=path;
        this._callback=callback;
        this.loading();
    }
    LoadData.prototype.loading=function () {
        $.get(this._path).done(function (data) {
            this._callback(data);
        }.bind(this))
    };
    ucai.LoadData=LoadData;
})();