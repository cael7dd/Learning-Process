(function () {
    function init() {
        var oEye = document.getElementsByClassName("d_eyeBorder");
        var oBall = document.getElementsByClassName("d_eyeBall");
        var oBorder = document.getElementById("d_border");
        for (var i = 0; i < oEye.length; i++) {
            var obj = addApplication(oEye[i], oBall[i], oBorder);
            obj.rotateEyeBall();
        }
    }

    init();
    function addApplication(eye, ball, border) {
        var eyeX = eye.getBoundingClientRect().left + parseInt(getComputedStyle(eye).width) / 2;
        var eyeY = eye.getBoundingClientRect().top + parseInt(getComputedStyle(eye).height) / 2;
        return {
            ball: ball,
            border: border,
            eyeCenterX: eyeX,
            eyeCenterY: eyeY,
            rotateEyeBall: function () {
                var top, left, a, b, c;
                Object.defineProperties(this, {
                    ball: {writable: false},
                    border: {writable: false},
                    eyeCenterX: {writable: false},
                    eyeCenterY: {writable: false}
                });
                function mouseIn(event) {
                    a = event.clientX - this.eyeCenterX;
                    b = event.clientY - this.eyeCenterY;
                    c = Math.sqrt(a * a + b * b);
                    if (c > 20) {
                        top = 25 + b / c * 20;
                        left = 25 + a / c * 20;
                       
                    }
                    else {
                        top = 25 + b;
                        left = 25 + a;
                        this.ball.style.background = "rgb(50,0,0)"
                    }
                    this.ball.style.background = "rgba(" + parseInt(Math.random() * 255) + "," +
                    parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," +
                    Math.random() + ")";
                    this.ball.style.transform = "scale(" + (1.2 - c / 2000) + ")";
                    this.ball.style.top = top + "px";
                    this.ball.style.left = left + "px";
                }

                this.border.addEventListener("mousemove", mouseIn.bind(this));
            }
        }
    }
})();