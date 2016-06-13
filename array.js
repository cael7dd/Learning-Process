/**
 * Created by 87676 on 2016/6/13.
 */
var arr=[{name:"aaa",age:12,sex:"female"},{name:"bb",age:13,sex:"male"},{name:"c",age:11,sex:"male"}];
arr.sort(function (a,b) {
    return a.name<b.name;
});
console.log(arr);