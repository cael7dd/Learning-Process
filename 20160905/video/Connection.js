/**
 * Created by 87676 on 9/5/2016.
 */
"use strict";
class Connection {
    constructor(socket) {
        this._socket=socket;
        this._id=Connection.__id++;
        Connection.connections.set(this._id,this);
        this.dispatchId();
        this.addSocketListeners();
    }
    dispatchId(){
        this._socket.emit("dispatchId",this._id);
    }
    addSocketListeners(){
        this._socket.on("disconnect",()=>{
            Connection.connections.delete(this._id);
            if(this._target){
                this._target._socket.emit("lostConnection");
                this._target._target=null;
            }

        });
        this._socket.on("decline",()=>{
            this._target._socket.emit("lostConnection");
            this._target._target=null;
            this._target=null;
        });
        this._socket.on("sendOffer",(data)=>{
            if(this._target){
                this._target._socket.emit("lostConnection");
                this._target._target=null;
            }
            this._target=Connection.connections.get(data.targetId);
            if(this._target){
                if(this._target._target){
                    this._socket.emit("targetBusy");
                }else{
                    this._target._target=this;
                    this._target._socket.emit("receivedOffer",{hostId:this._id,offer:data.offer});
                }
            }else {
                this._socket.emit("noTarget");
            }


        });
        this._socket.on("sendAnswer",(data)=>{
            this._target._socket.emit("receivedAnswer",data);
        });
        this._socket.on("sendCandidate",(data)=>{
            this._target._socket.emit("receivedCandidate",data);
        });
    }
}
Connection.__id=1;
Connection.connections=new Map();
module.exports = Connection;