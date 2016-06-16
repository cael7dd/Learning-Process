/**
 * Created by 87676 on 2016/6/15.
 */
(function () {
    var oHour = document.getElementById("d_hour");
    var oMinute = document.getElementById("d_minute");
    var oSecond = document.getElementById("d_second");
    var oDate=document.getElementById("d_date");
    var oMonth=document.getElementById("d_month");
    var oDay=document.getElementById("d_day");
    for(var i=1;i<13;i++){
        var oOneMonth=document.createElement("div");
        oOneMonth.style.height="100%";
        oOneMonth.className="months";
        oOneMonth.innerHTML=i;
        oMonth.appendChild(oOneMonth);
    }
    for(i=1;i<32;i++){
        var oOneDay=document.createElement("div");
        oOneDay.style.height="100%";
        oOneDay.className="days";
        oOneDay.innerHTML=i;
        oDay.appendChild(oOneDay);
    }
    function show() {
        var oTime = new Date();
        var iHourAngle = ((oTime.getHours() > 12) ? oTime.getHours() - 12 : oTime.getHours()) * 30 + oTime.getMinutes() * 0.5 + oTime.getSeconds() / 120;
        var iMinuteAngle = oTime.getMinutes() * 6 + oTime.getSeconds() / 10;
        var iSecondAngle = oTime.getSeconds() * 6;
        if(!iSecondAngle){
            oSecond.style.transform="rotate(360deg)";
            setTimeout(function () {
                oSecond.style.transition="0s";
                oSecond.style.transform="rotate(0deg)";
            },800);
            return;
        }
        oSecond.style.transition="0.5s";
        oSecond.style.transform = "rotate(" + iSecondAngle + "deg)";
        oMinute.style.transform = "rotate(" + iMinuteAngle + "deg)";
        oHour.style.transform = "rotate(" + iHourAngle + "deg)";
        oMonth.style.top=-oTime.getMonth()*35+"px";
        oDay.style.top=(-oTime.getDate()+1)*35+"px";
    }
    show();
    setInterval(show, 1000);
    function clockNumber() {
        var oBackground = document.getElementById("d_background");
        for (var i = 1; i < 13; i++) {
            var oNumber = document.createElement("div");
            oNumber.className="d_number";
            oNumber.style.position = "absolute";
            oNumber.innerHTML = "<span style='display:block;transform:rotate("+(-i*30)+"deg)'>"+i+"</span>";
            oNumber.style.height = "190px";
            oNumber.style.width = "20px";
            oNumber.style.left = "190px";
            oNumber.style.top = "10px";
            oNumber.style.transformOrigin = "50% 100%";
            oNumber.style.fontSize = "20px";
            oNumber.style.transform = "rotate(" + i * 30 + "deg)";
            oBackground.appendChild(oNumber);
        }
    }
    clockNumber();
})();