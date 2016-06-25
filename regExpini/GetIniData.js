/**
 * Created by 87676 on 2016/6/24.
 */
window.ucai=window.ucai||{};
(function () {
    function GetIniData(file) {
        $.get(file).done(function (data) {
            this.data=data;
            ucai.classifyData.call(this);
            console.log(this.obj);
        }.bind(this))
    }
    ucai.getIniData=GetIniData;
})();