/**
 * Created by 87676 on 8/4/2016.
 */
(function () {
    function EncryptionCode(data) {
        var str = "";
        for (var i = data.length - 1; i >= 0; i--) {
            if (i % 2) {
                str += String.fromCharCode(data.charCodeAt(i) - 1);
            } else {
                str += String.fromCharCode(data.charCodeAt(i) + 1);
            }
        }
        return str;
    }

    function EncodingEncryption(data) {
        var str = "";
        for(var i=data.length-1;i>=0;i--){
            var j=data.length-1-i;
            if (j % 2) {
                str += String.fromCharCode(data.charCodeAt(i) + 1);
            } else {
                str += String.fromCharCode(data.charCodeAt(i) - 1);
            }
        }
        return str;
    }

    window.EncryptionCode = EncryptionCode;
    window.EncodingEncryption = EncodingEncryption;
})();