/**
 * Created by 87676 on 2016/6/25.
 */
window.ucai=window.ucai||{};
(function () {
    function DropMusic() {
        this.getNode();
        this.addListener();
    }
    DropMusic.prototype.getNode=function () {
        this._NodePlayer=document.getElementById("audio");
        this._NodeContainer=document.getElementById("d_list");
        this._NodeList=document.getElementById("d_list");
    };
    DropMusic.prototype.addListener=function () {
        this._NodeContainer.ondragover=function (event) {
            event.preventDefault();
        };
        this._NodeContainer.ondrop=function (event) {
            event.preventDefault();
            this.getFiles(event.dataTransfer.files);
        }.bind(this);
    };
    DropMusic.prototype.getFiles=function (files) {
        var self=this;
        function readFile(file) {
            var reader=new FileReader();
            reader.onload=function () {
                self._NodePlayer.src=reader.result;
            };
            reader.readAsDataURL(file);
        }
        for(var i=0;i<files.length;i++){
            if(files[i].type=="audio/mp3"){
                var song=new ucai.SongList(files[i],this._NodeList);
                song.onSelect=readFile;
            }
        }
    };
    new DropMusic();

})();