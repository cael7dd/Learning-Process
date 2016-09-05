/**
 * Created by 87676 on 9/5/2016.
 */
(function () {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

    function Main() {
        this.busy=false;
        this.getElements();
        this.connectToServer();
        this.createPc();
        this.getMedia();
        this.addListeners();
        this.addSocketListener();
    }

    Main.prototype.getElements = function () {
        this._nodeLocalVideo = document.querySelector("#localVideo");
        this._nodeRemoteVideo = document.querySelector("#remoteVideo");
        this._nodeMyId = document.querySelector("#myId");
        this._nodeTargetId = document.querySelector("#targetId");
        this._nodeSubmit = document.querySelector("#submit");
        this._nodeConfirmBox=document.querySelector("#confirmBox");
        this._nodeConfirm=document.querySelector("#confirm");
        this._nodeDecline=document.querySelector("#decline");
        Main._nodeMsg=document.querySelector("#msg");
    };
    Main.prototype.showBox=function () {

    };
    Main.prototype.createPc=function () {
        var self=this;
        var count=1;
        this._pc=new PeerConnection(null);
        this._pc.onicecandidate=function (event) {
            self._socket.emit("sendCandidate",event.candidate);
        };
        this._pc.onaddstream=function (event) {
            console.log(">>>>>>>>>>>>>>",new Date().getUTCSeconds());
            self._nodeRemoteVideo.src=URL.createObjectURL(event.stream);
        };
    };
    Main.prototype.showMsg=function (msg,goodNews) {
        if(goodNews){
            Main._nodeMsg.innerHTML+="<div style='color: #0c60ee'>"+msg+">>>>>>"+new Date().getUTCSeconds()+"</div>";
        }else{
            Main._nodeMsg.innerHTML+="<div style='color: #f30'>"+msg+">>>>>>"+new Date().getUTCSeconds()+"</div>";
        }
    };
    Main.prototype.connectToServer=function () {
        this._socket = io.connect(location.origin);
    };
    Main.prototype.getMedia = function () {
        var self=this;
        navigator.getUserMedia({audio: true, video: {width: 320, height: 200}},
            function (stream) {
                self._stream=stream;
                self._nodeLocalVideo.src=URL.createObjectURL(stream);
                self._pc.addStream(stream);
                self.showMsg("看见自己了吗？",true);
            },
            function () {
                self.showMsg("开摄像头啊，大哥!",false);
            })
    };
    Main.prototype.setId=function (value) {
        this._nodeMyId.innerHTML=value;
        this._id=value;
    };

    Main.prototype.addListeners = function () {
        var self = this;
        this._nodeSubmit.addEventListener("click", function () {
            if(self.busy){
                self._socket.emit("decline");
                self.changeBusy.call(self);
                self._pc.removeStream(self._stream);
            }else{
                var targetId = self._nodeTargetId.value;
                if (targetId) {
                    if(targetId!=self._id){
                        self._targetId = parseInt(targetId);
                        self.startCall();
                    }else {
                        self.showMsg("大哥，你连自己玩啊！");
                    }

                }else {
                    self.showMsg("大哥，你让我连谁去啊！");
                }
            }

        });
    };
    /*ClientA首先创建PeerConnection对象，然后打开本地音视频设备，将音视频数据封装成MediaStream添加到PeerConnection中。
     ClientA调用PeerConnection的CreateOffer方法创建一个用于offer的SDP对象，SDP对象中保存当前音视频的相关参数。ClientA通过PeerConnection的SetLocalDescription方法将该SDP对象保存起来，并通过Signal服务器发送给ClientB。
     ClientB接收到ClientA发送过的offer SDP对象，通过PeerConnection的SetRemoteDescription方法将其保存起来，并调用PeerConnection的CreateAnswer方法创建一个应答的SDP对象，通过PeerConnection的SetLocalDescription的方法保存该应答SDP对象并将它通过Signal服务器发送给ClientA。
     ClientA接收到ClientB发送过来的应答SDP对象，将其通过PeerConnection的SetRemoteDescription方法保存起来。
     在SDP信息的offer/answer流程中，ClientA和ClientB已经根据SDP信息创建好相应的音频Channel和视频Channel并开启Candidate数据的收集，Candidate数据可以简单地理解成Client端的IP地址信息（本地IP地址、公网IP地址、Relay服务端分配的地址）。
     当ClientA收集到Candidate信息后，PeerConnection会通过OnIceCandidate接口给ClientA发送通知，ClientA将收到的Candidate信息通过Signal服务器发送给ClientB，ClientB通过PeerConnection的AddIceCandidate方法保存起来。同样的操作ClientB对ClientA再来一次。
     这样ClientA和ClientB就已经建立了音视频传输的P2P通道，ClientB接收到ClientA传送过来的音视频流，会通过PeerConnection的OnAddStream回调接口返回一个标识ClientA端音视频流的MediaStream对象，在ClientB端渲染出来即可。同样操作也适应ClientB到ClientA的音视频流的传输。
     */
    Main.prototype.addSocketListener=function () {
        var self=this;
        this._socket.on("dispatchId",function (data) {
            this.setId(data);
        }.bind(this));
        this._socket.on("receivedOffer",function (data) {
            self._pc.addStream(self._stream);
            self._nodeTargetId.value=self._targetId=data.hostId;
            self._pc.setRemoteDescription(data.offer,function () {
                self._pc.createAnswer(function (answer) {
                    self.showMsg("回复造出来啦！",true);
                    self._pc.setLocalDescription(answer,function () {
                        self.showMsg("回复发出去啦！",true);
                        self.changeBusy.call(self);
                        self._socket.emit("sendAnswer",answer);
                    },function () {
                        self.showMsg("我创建完应答，想自己存一份来着，可惜失败了");
                    });
                },function () {
                    self.showMsg("创建回应answer失败，不给力呀！");
                });
            })
        });
        this._socket.on("receivedAnswer",function (data) {
            self._pc.setRemoteDescription(data,function () {
                self.showMsg("收到对方回复啦！",true);
                self.changeBusy.call(self);
                self._pc.addStream(self._stream);
            },function () {
                self.showMsg("我好不容易接收到了人家的回复，想存下人家的信息，奈何失败了");
            });
        });
        this._socket.on("receivedCandidate",function (data) {
            if(data){
                self.showMsg("收到数据啦！",true);
                self._pc.addIceCandidate(data);
            }
        });
        this._socket.on("lostConnection",function () {
            //self._pc.removeStream(self._stream);
            self.showMsg("对方不想跟你说话，并断开了连接！");
            self.changeBusy.call(self);
            self._targetId=null;
        });
        this._socket.on("noTarget",function () {
            self.showMsg("没这人大哥，换个人吧！");
        });
        this._socket.on("targetBusy",function () {
            self.showMsg("人家没空鸟你！");
        });
    };
    Main.prototype.changeBusy=function () {
        if(this.busy){
            this.busy=false;
            this._nodeSubmit.innerHTML="确认";
        }else{
            this.busy=true;
            this._nodeSubmit.innerHTML="断开";
        }
    };
    Main.prototype.startCall=function () {
        var self=this;
        this._pc.createOffer(function (offer) {
            self.showMsg("请求造出来啦！",true);
            self._pc.setLocalDescription(offer,function () {
                self._socket.emit("sendOffer",{targetId:self._targetId,offer:offer});
                self.showMsg("请求发出去啦！",true);
            },function () {
                self.showMsg("保存offer到localDescription失败！");

            });
        },function (err) {
            console.log(err);
            self.showMsg("创建请求失败！");
        });
    };

    new Main();
})();