/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    function Picture(item) {
        var oPicture=Block();
        oPicture.item=item;
        oPicture.createPicture=function () {
            var oBlock=this.createBlock();
            for(var i=0;i<2;i++){
                var oPic=document.createElement("div");
                oPic.style.width="100%";
                oPic.style.height="100%";
                oPic.style.position="absolute";
                oPic.style.background=(i==0)?"url(pic/"+(this.item*2-1)+".jpg) 50% 50%":"url(pic/"+this.item*2+".jpg) 50% 50%";
                oPic.style.backgroundSize="cover";
                oPic.style.transform=(i==0)?"rotateY(0deg) translateZ(1px)":"rotateY(180deg) translateZ(1px)";
                oBlock.appendChild(oPic);
            }
            return oBlock;
        };
        return oPicture;
    }
    window.Picture=Picture;
})();