/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai=window.ucai||{};
(function () {
    function ChartName(context,beginPoi,chartHeight,chartWidth,data) {
        this._context=context;
        this.beginPoi=beginPoi;
        this.chartWidth=chartWidth;
        this.chartHeight=chartHeight;
        this.data=data;
        this.addText();
    }
    ChartName.prototype.addText=function () {
        var x=this.beginPoi[0]+40;
        var y=this.beginPoi[1]+this.chartHeight+10;
        this._context.font="18px MicrosoftYaHei";
        for(var i in this.data){
            if(i=="length"){continue}
            this._context.moveTo(x,y);
            this._context.fillText(i,x,y+10);
            x+=this.chartWidth/this.data.length;
        }
    };
    ucai.ChartName=ChartName;
})();