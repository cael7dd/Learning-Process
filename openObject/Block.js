/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    function Block() {
        var oBlock={};
        oBlock.createBlock=function () {
            var oDiv=document.createElement("div");
            oDiv.style.height="240px";
            oDiv.style.width="360px";
            oDiv.style.float="left";
            oDiv.style.margin="10px";
            oDiv.style.position="relative";
            oDiv.style.transformStyle="preserve-3d";
            oDiv.onmouseover=function () {
                this.style.animation="pictureRotate 1s forwards";
            };
           oDiv.onmouseout=function () {
               this.style.animation="pictureRotateBack";
               this.style.animationDuration="1s";
           };
            return oDiv;
        };
        return oBlock;
    }
    window.Block=Block;
})();