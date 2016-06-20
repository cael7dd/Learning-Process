/**
 * Created by 87676 on 2016/6/19.
 */
window.audio=window.audio||{};
(function () {
    function init() {
       var source="music/Justin Bieber - What Do You Mean.mp3";
        var str="[00:00.23]What Do You Mean?[00:01.79]演唱：Justin Bieber[00:11.79]"+
            "What do you mean[00:16.27]When you nod your head yes"+
            "[00:20.82]But you wanna say no[00:22.72]What do you mean[00:23.90]"+
            "When you don't want me to move[00:28.51]But you tell me to go"+
            "[00:30.25]What do you mean[00:31.61]What do you mean[00:35.39]"+
            "Said we're running out of time what do you mean[00:39.30]"+
            "What do you mean[00:43.09]Better make up your mind"+
            "[00:45.53]What do you mean[00:46.91]You're so indecisive of "+
            "what I'm saying[00:50.87][00:52.09]Trying to catch the beat make up your heart"+
            "[00:54.66]Don't know if you're happy or complaining[00:58.51]"+
            "Don't want for us to end where do I start[01:02.14]"+
            "First you wanna go left and you want to turn right[01:06.23]"+
            "Wanna argue all day make love all night[01:10.01]"+
            "First you up and you're down and then between[01:13.92]"+
            "Oh I really want to know[01:16.34]What do you mean[01:17.67]"+
            "When you nod your head yes[01:22.23]But you wanna say no[01:23.92]"+
            "What do you mean[01:25.30]When you don't want me to move"+
            "[01:29.86]But you tell me to go[01:31.61]What do you mean[01:33.03]"+
            "What do you mean[01:37.01]Said we're running out of time "+
            "what do you mean[01:40.81]What do you mean[01:44.43]"+
            "Better make up your mind[01:46.93]What do you mean[01:48.33]"+
            "You're overprotective when I'm leaving[01:52.34]"+
            "Trying to compromise but I can't win[01:56.18]"+
            "You wanna make a point but you keep preaching[02:00.03]"+
            "You had me from the start won't let this end"+
            "[02:04.17]First you wanna go left and you want to turn right[02:07.59]"+
            "Wanna argue all day make love all night[02:11.55]"+
            "First you up and you're down and then between[02:15.33]"+
            "Oh I really want to know[02:17.89]What do you mean[02:18.99]"+
            "When you nod your head yes[02:23.70]But you wanna say no[02:25.40]What do you mean"+
            "[02:26.56]When you don't want me to move[02:31.39]But you tell me to go"+
            "[02:33.04]What do you mean[02:34.48]What do you mean[02:38.23]"+
            "[02:39.34]Said we're running out of time what do you mean[02:41.96]"+
            "[02:44.52]What do you mean[02:45.99]Better make up your mind"+
            "[02:48.38]What do you mean[02:49.74]When you nod your head yes"+
            "[02:54.30]But you wanna say no[02:56.02]What do you mean[02:57.50]"+
            "When you don't want me to move[03:02.02]But you tell me to go"+
            "[03:03.72]What do you mean[03:05.15]What do you mean[03:08.97]"+
            "Said we're running out of time what do you mean[03:12.89]"+
            "What do you mean[03:16.66]Better make up your mind"+ "[03:19.12]What do you mean";
        var obj=new audio.CreatePlayer(source,str);
        obj.getHTML();
        obj.init();
    }
    init();
})();