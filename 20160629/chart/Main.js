/**
 * Created by 87676 on 2016/6/29.
 */
window.ucai = window.ucai || {};
(function () {
    function Main() {
        this._canvas = document.getElementById("canvas");
        this._context = this._canvas.getContext("2d");
        this.path = "data.json";
        this.chartWidth = 400;
        this.chartHeight = 400;
        this.beginPoi = [100, 100];
        this.color={"Chrome":"blue","Firefox":"orange","IE":"red","Edge":"green"};
        var self = this;
        new ucai.LoadData(this.path, function (data) {
            self.data = data;
            self.data.length=0;
            for(var i in self.data){
                self.data.length++;
            }
           self.data.length--;
            new ucai.CoordinateSystem(self._context,self.beginPoi,self.chartWidth,self.chartHeight,self.data.length);
            new ucai.ChartName(self._context,self.beginPoi,self.chartHeight,self.chartWidth,self.data);
            new ucai.ChartBuilder(self._context,self.beginPoi,self.chartHeight,self.chartWidth,self.data,self.color);
            new ucai.Legend(self.color,[550,200],self._context);
        });

    }

    new Main();
})();