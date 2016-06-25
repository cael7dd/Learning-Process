/**
 * Created by 87676 on 2016/6/25.
 */
window.ucai=window.ucai||{};
(function () {
    function DropList(dom,list) {
        var player=new FileReader;

        var currentAudio;
        player.onload=function () {
            if(currentAudio){
                currentAudio.parentNode.removeChild(currentAudio);
            }
            currentAudio=document.createElement("audio");
            currentAudio.autoplay="autoplay";
            currentAudio.src=player.result;
            currentAudio.controls="controls";
            document.body.appendChild(currentAudio);
        };
        dom.ondragover=function (event) {
            event.preventDefault();
        };
        dom.ondrop=function (event) {
            var name=[];
            var filesNumber=[];
            event.preventDefault();
            var files=event.dataTransfer.files;
            for(var i=0;i<files.length;i++){
                if(files[i].type="audio/mp3"){
                    name.push(files[i].name);
                    filesNumber.push(i);
                }
            }
            for(i=0;i<name.length;i++){
                var div=document.createElement("div");
                div.className="d_item";
                div.innerHTML=name[i];
                list.appendChild(div);
                (function (m) {
                    div.onclick=function () {
                        console.log(files);
                        player.readAsDataURL(files[filesNumber[m]]);
                    };
                })(i);
            }
        }
    }
    ucai.DropList=DropList;
})();