/**
 * Created by 87676 on 7/7/2016.
 */
(function () {
    function init() {
        var form=$("#form");
        var result=$("#result");
        form.on("submit",function (event) {
            event.preventDefault();
            result.html("loading...");
            $.post("/loginByjQ",{userName:form[0]["userName"].value,password:form[0]["password"].value},function (data) {
                result.html(data);
            })
        })
    }
    init();
})();