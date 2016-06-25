/**
 * Created by 87676 on 2016/6/24.
 */
window.ucai=window.ucai||{};
(function () {
    function GetIniData(file) {
        $.get(file).done(function (data) {
            
            var a =new ucai.classifyData(data);
            this.iniResult=a.obj;
            console.log(a.obj);
        }.bind(this))
    }
    ucai.getIniData=GetIniData;
})();