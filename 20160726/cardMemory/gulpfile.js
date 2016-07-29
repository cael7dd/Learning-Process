/**
 * Created by 87676 on 7/26/2016.
 */
const gulp=require("gulp");
const shell=require("gulp-shell");
const fs=require("fs");

const closureFileName=`closure-compiler-v20160713.jar`;
const closureFilePath=`${__dirname}/tools/${closureFileName}`;
const distFileName=`game.min.js`;
const distFilePath=`${__dirname}/dist/${distFileName}`;
const mapFileName=`${distFileName}.map`;
const mapFilePath=`${__dirname}/dist/${mapFileName}`;
const srcFiles=[
    "game2d/app/Game2dApp.js",
    "game2d/display/Container.js",
    "game2d/display/Display.js",
    "game2d/display/Rect.js",
    "game2d/display/Text.js",
    "game2d/event/Game2dEvent.js",
    "game2d/event/Game2dEventDispatcher.js",
    "game2d/event/Game2dMouseEvent.js",
    "mygame/Game.js"
];

var script=`java -jar ${closureFilePath} --create_source_map ${mapFilePath}  --js_output_file ${distFilePath} --js ${srcFiles.join(" ")}`;
gulp.task("compile",shell.task([script],{cwd:"src"}));
gulp.task("appendMapInfo",["compile"],function () {
    fs.appendFileSync(distFilePath,`\n//#sourceMappingURL= ${mapFileName}\n`);
});
gulp.task("default",["appendMapInfo"]);
