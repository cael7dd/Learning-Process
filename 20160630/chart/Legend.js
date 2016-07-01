/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai=window.ucai||{};
(function () {
    function Legend(colors,position,context) {
        this.color=colors;
        this.poi=position;
        this.context=context;
        this.addLegend();
    }
    Legend.prototype.addLegend=function () {
        var x=this.poi[0];
        var y=this.poi[1];
        for(var i in this.color){
            this.context.save();
            this.context.fillStyle=this.color[i];
            this.context.fillRect(x,y,30,20);
            this.context.fillStyle="#000";
            this.context.fillText(i,x+35,y+16);
            y+=30;
            this.context.restore();
        }
    };
    ucai.Legend=Legend;
})();