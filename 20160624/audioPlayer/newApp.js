/**
 * Created by 87676 on 2016/6/20.
 */
window.audio=window.audio||{};
(function () {
    var sourceName=["Adam Lambert - Ghost Town","adele - rolling in the deep",
        "Aronchupa - I'm An Albatraoz","Justin Timberlake - Can't Stop The Feeling","Avril Lavigne - Here's To Never Growing Up",
    "Justin Bieber - What Do You Mean","Onerepublic - Counting Stars"];
    var sourcePath=["music/","music/","music/","music/","music/","music/","music/"];

    var songs=new audio.createAudio(sourceName,sourcePath);
    //songs.getLrc();
    songs.getStart();
})();
