/**
 * Created by 87676 on 2016/7/2.
 */
(function () {
    var ipt = document.getElementById("clear");
    ipt.onclick = function () {
        var request = indexedDB.deleteDatabase(config.DATA_BASENAME);
        console.log("都删了");
    }
})();