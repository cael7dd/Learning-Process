/**
 * Created by 87676 on 8/8/2016.
 */
var gulp=require("gulp");
var shell=require("gulp-shell");

var src=["Ball.ts","Block.ts","Main.ts"];
var dist=`Main.js`;
var compilePath=`${__dirname}/tools/closure-compiler-v20160713.jar`;

gulp.task("compile",shell.task([`tsc --out ${dist} ${src.join(" ")}`],{cwd:"src"}));
gulp.task("depress",["compile"],shell.task([`java -jar ${compilePath} --js_output_file ../dist/Main.min.js --js Main.js`],{cwd:"src"}));
gulp.task("default",["depress"]);