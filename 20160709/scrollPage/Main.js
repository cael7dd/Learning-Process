/**
 * Created by 87676 on 7/9/2016.
 */
(function () {
    var config = ["pictures/1.jpg", "pictures/2.jpg", "pictures/3.jpg", "pictures/4.jpg", "pictures/5.jpg", "pictures/6.jpg"];

    function Main() {
        this._domImages = $(".d_image");
        this._domBorder = $("#con");
        this._domImages.css({height: screen.height});
        this._startY = 0;
        this._currentTop = 0;
        this._startTime = 0;
        this._lastMovePoi = 0;
        this.init();
        this.addListeners();
    }
    Main.prototype.init = function () {
        for (var i = 0; i < this._domImages.length; i++) {
            $(this._domImages[i]).css({backgroundImage: "url(" + config[i] + ")"});
        }
    };
    Main.prototype.judgeSwi = function () {
        var iMargin = -this._currentTop / screen.height;
        if (this._lastMovePoi - this._startY < 0) {
            this._currentTop = -(parseInt(iMargin) + 1) * screen.height;
        } else {
            this._currentTop = -parseInt(iMargin) * screen.height;
        }
        this._currentTop = this.judgePoi(this._currentTop);
        $(this._domBorder[0]).css({transition: "top 0.3s", top: this._currentTop + "px"});
    };
    Main.prototype.judgeFlip = function () {
        var iMargin = -this._currentTop / screen.height;
        this._currentTop = -Math.round(iMargin) * screen.height;
        $(this._domBorder[0]).css({transition: "top 0.3s", top: this.judgePoi(this._currentTop) + "px"});
    };
    Main.prototype.judgePoi = function (value) {
        if (value > 0) {
            value = 0
        }
        else if (value < -(this._domImages.length - 1) * screen.height) {
            value = -(this._domImages.length - 1) * screen.height;
        }
        return value;
    };
    Main.prototype.addListeners = function () {
        $(document).on("touchstart", function (event) {
            this._startTime = event.timeStamp;
            this._startY = event.originalEvent.targetTouches[0].clientY;
            this._lastMovePoi=this._startY;
            $(this._domBorder[0]).css({transition: "top 0s"});
        }.bind(this));
        $(document).on("touchmove", function (event) {
            event.preventDefault();
            this._lastMovePoi = event.originalEvent.targetTouches[0].clientY;
            var value = this._currentTop + this._lastMovePoi - this._startY;
            if (value > 0) {
                value = value-value*0.6;
            }
            else if (value < -(this._domImages.length - 1) * screen.height) {
                value = value- (value+(this._domImages.length - 1) * screen.height)*0.6;
            }
            $(this._domBorder[0]).css({top: value + "px"});
        }.bind(this));
        $(document).on("touchend", function (event) {
            var endTime = event.timeStamp;
            this._currentTop = parseInt($(this._domBorder[0]).css("top"));
            if (Math.abs(this._lastMovePoi - this._startY) / (endTime - this._startTime) > 0.5&&this._lastMovePoi - this._startY!=0) {
                this.judgeSwi();
                return;
            }
            this.judgeFlip();
        }.bind(this))
    };
    new Main();
})();