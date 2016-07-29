/**
 * Created by 87676 on 7/28/2016.
 */
const gulp=require("gulp");
const shell=require("gulp-shell");

var script=`egret build`;
gulp.task("default",["run"]);
gulp.task("build",shell.task([script]));
gulp.task("run",["build"],shell.task(["egret run"]));