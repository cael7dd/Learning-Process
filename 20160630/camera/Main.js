/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai = window.ucai || {};
(function () {
    function Main() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.div = document.getElementById("d_fps");
        this.btn = document.getElementById("btn");
        this.container = document.getElementById("d_container");
        this.currentTime = 0;
        navigator.getUserMedia = navigator.getUseMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        this.video = document.createElement("video");
        this.loadCamera();
        this.addListeners();
        this.render();
    }

    Main.prototype.loadCamera = function () {
        navigator.getUserMedia({video: true}, function (stream) {
            var url = URL.createObjectURL(stream);
            this.video.src = url;
        }.bind(this), function (error) {
            console.log(error);
        })
    };
    Main.prototype.addListeners = function () {
        this.btn.onclick = function (event) {
            var a = document.createElement("a");
            a.href = this.canvas.toDataURL();
            a.target = "_blank";
            a.style.backgroundImage = "url(" + a.href + ")";
            a.className = "img";
            this.container.appendChild(a);
        }.bind(this);
    };
    Main.prototype.render = function (time) {
        var d = time - this.currentTime;
        this.div.innerHTML = Math.round(1000 / d) + "fps";
        this.currentTime = time;
        this.context.drawImage(this.video, 0, 0);
        requestAnimationFrame(this.render.bind(this));
    };
    new Main();
})();