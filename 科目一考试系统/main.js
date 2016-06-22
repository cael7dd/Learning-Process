/**
 * Created by 87676 on 2016/6/22.
 */
window.testSystem=window.testSystem||{};
(function () {
    function main() {
        var dataName="questions.json";
        var dataPath="";
        var obj=new testSystem.createSystem(dataName,dataPath);
        obj.getData();
    }
    main();
})();