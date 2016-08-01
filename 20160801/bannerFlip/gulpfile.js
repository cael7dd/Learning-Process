/**
 * Created by 87676 on 8/1/2016.
 */
const gulp=require("gulp");
const shell=require("gulp-shell");
const compilerPath=`${__dirname}/tools/closure-compiler-v20160713.jar`;
const distPath=`../dist/Main.min.js`;
const srcFiles=["Block.ts",
    "Main.ts"
];

gulp.task("compile",shell.task([`tsc --out Main.js ${srcFiles.join(" ")}`],{cwd:"src"}));
gulp.task("depress",["compile"],shell.task([`java -jar ${compilerPath} --js_output_file ${distPath} --js Main.js`],{cwd:"src"}));
gulp.task("default",["depress"]);