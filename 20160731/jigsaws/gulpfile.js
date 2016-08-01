/**
 * Created by 87676 on 7/29/2016.
 */
const gulp=require("gulp");
const shell=require("gulp-shell");
const compiler=`${__dirname}/tools/closure-compiler-v20160713.jar`;

gulp.task("compile",shell.task(["tsc --out Main.js Block.ts Main.ts "],{cwd:"src"}));
gulp.task("depress",["compile"],shell.task([`java -jar ${compiler} --js_output_file ../Main.min.js --js Main.js`],{cwd:"src"}));
gulp.task("default",["depress"]);