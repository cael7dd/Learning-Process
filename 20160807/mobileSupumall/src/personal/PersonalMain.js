/**
 * Created by 87676 on 8/5/2016.
 */
(function () {
    function PersonalMain() {
        this.initHeight();
        this.loadUserInfo();
        this.quit();
    }
    PersonalMain.prototype.quit=function () {
        var btn=document.querySelector("#quit");
        btn.addEventListener("touchstart",function () {
            window.sessionStorage.setItem("lastPage",window.location.href);
            window.sessionStorage.setItem("CU","");
            window.localStorage.setItem(EncryptionCode(this.userID),"");
        }.bind(this));
    };
    PersonalMain.prototype.initHeight=function () {
        document.body.style.height=window.innerHeight+"px";
    };
    PersonalMain.prototype.loadUserInfo=function () {
        var temp=window.sessionStorage.getItem("CU");
        var self=this;
        if(temp){
            this.userID=EncodingEncryption(temp);
            $.ajax({url:"http://datainfo.duapp.com/shopdata/getuser.php",dataType:"jsonp",data:{userID:this.userID},success:function (data) {
                self.addUserData(data[0]);
            }});
        }else{
            window.sessionStorage.setItem("lastPage2","P"+window.location.href);
            window.location.href="../login/index.html";
        }

    };
    PersonalMain.prototype.addUserData=function (data) {
        var id="";
        for(var i=0;i<data[0].length;i++){
            (i>2&&i<data[0].length-3)?id+="*":id+=data[0][i];
        }
        var sex="";
        (data.sex==null)?sex="未知":sex=data.sex;
        var nodeUserID=document.querySelector("#s_userID");
        var sculpture=document.querySelector("#a_personalSculpture");
        var nodeSex=document.querySelector("#s_userSex");
        nodeUserID.innerHTML=id;
        sculpture.style.background="url('"+data[1]+"')";
        sculpture.style.backgroundSize="100% 100%";
        nodeSex.innerHTML="性别："+sex;
    };
    new PersonalMain();
})();