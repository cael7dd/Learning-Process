/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai=window.ucai||{};
(function () {
    function ChartBuilder(context,beginPoi,chartHeight,chartWidth,data,color) {
        this._context=context;
        this.beginPoi=beginPoi;
        this.chartWidth=chartWidth;
        this.chartHeight=chartHeight;
        this.data=data;
        this.color=color;
        this.addChart();
    }
    ChartBuilder.prototype.addChart=function () {
        var x=this.beginPoi[0];
        var y=this.beginPoi[1];
        for(var i in this.data){
            if(i=="length"){continue}
            x+=20;
            for(var j in this.data[i]){
                this._context.save();
                this._context.fillStyle=this.color[j];
                this._context.fillRect(x,y+(100-this.data[i][j])/100*this.chartHeight,20,this.data[i][j]/100*this.chartHeight);
                this._context.fillText(this.data[i][j],x,y+(100-this.data[i][j])/100*this.chartHeight-5);
                this._context.restore();
                x+=20;
            }
        }
    };
    ucai.ChartBuilder=ChartBuilder;
})();