/**
 * Created by 87676 on 7/22/2016.
 */
"use strict";
class Connection {
    constructor(socket) {
        this._socket = socket;
        this.addListeners();
    }

    //遍历服务数组，寻找服务数量最少的作为该客户的服务人员
    lookAllServer() {
        for (var key of Connection.adminMap.keys()) {
            var server = Connection.adminMap.get(key);
            if (server.client.length <= Connection.servedAmount) {
                this.server = server;
                server.client.push(this._id);
                server._socket.emit("client", this._id);
                this._socket.emit("accept", server._id);
                break;
            }
        }
    }

    //为客户寻找服务，如果第一次遍历没有找到，则增加单个服务的最大数量，再次遍历，若还未找到，说明没有服务，发送事件none
    findServer() {
        this.lookAllServer();
        if (!this.server) {
            Connection.servedAmount++;
            this.lookAllServer();
            if (!this.server) {
                this._socket.emit("none");
                Connection.checkRepeat(this._id);
                Connection.waitingClient.push(this);
            }
        }
    }

    addListeners() {
        //当连接为用户时，将其添加到userMap中，并为其寻找服务
        this._socket.on("user", ()=> {
            this._socket.join("user");
            this.group = "userMap";
            this._id = Connection.chooseId(this.group);
            Connection.userMap.set(this._id, this);
            this.findServer();
        });
        //当服务连接时，将其添加到adminMap中，如果排队序列不为空，则选取第一个作为它的客户，并对队列中剩余的再次寻找服务
        this._socket.on("admin", ()=> {
            this._socket.join("admin");
            this.group = "adminMap";
            this._id = Connection.chooseId(this.group);
            Connection.adminMap.set(this._id, this);
            this.client = [];
            if (Connection.waitingClient.length != 0) {
                var tempC = Connection.waitingClient[0];
                tempC.server = this;
                this.client.push(tempC._id);
                this._socket.emit("client", this._id);
                tempC._socket.emit("accept", this._id);
                Connection.waitingClient.shift();
            }
            for (var i = 0; i < Connection.waitingClient.length; i++) {
                Connection.waitingClient[i].findServer.call(Connection.waitingClient[i]);
            }
            if (this.client.length == 0) {
                this._socket.emit("none");
            }
        });
        //当服务断开连接时，如果有客户，则为其再次寻找服务，若客户断开时，则给其服务发送信息，客户断开
        this._socket.on("disconnect", ()=> {
            if (this.group) {
                Connection[this.group].delete(this._id);
                if (this.group == "adminMap") {
                    if (this.client.length > 0) {
                        for (let i = 0; i < this.client.length; i++) {
                            var tempC = parseInt(this.client[i]);
                            Connection.userMap.get(tempC).server = null;
                            Connection.userMap.get(tempC)._socket.emit("declined", this._id);
                            Connection.userMap.get(tempC).findServer.call(Connection.userMap.get(tempC));
                        }
                    }
                } else {
                    if (this.server) {
                        this.server._socket.emit("leave", this._id);
                        Connection.servedAmount=Math.max(1,Connection.servedAmount-1);
                        for (let i = 0; i < this.server.client.length; i++) {
                            if (this.server.client[i] == this._id) {
                                this.server.client.splice(i, 1);
                                break;
                            }
                        }
                        if (this.server.client.length == 0) {
                            this.server._socket.emit("none");
                        }
                    }
                }
            }
        });
        //客户和服务之间进行通信
        this._socket.on("chat", (data)=> {
            if (this.group == "adminMap") {
                let temp = /\?id:([^\&]+)&(.*)/.exec(data);
                let clientId = parseInt(temp[1]);
                Connection.userMap.get(clientId)._socket.emit("chat", temp[2]);
            } else {
                this.server._socket.emit("chat", "?id:" + this._id + "&" + data);
            }
        });
    }
}
Connection.waitingClient = [];
Connection.servedAmount = 1;
Connection.userMap = new Map();
Connection.adminMap = new Map();
Connection.chooseId = function (group) {
    for (var i = 0; ; i++) {
        if (!Connection[group].get(i)) {
            return i;
        }
    }
};
Connection.checkRepeat = function (id) {
    for (var i = 0; i < Connection.waitingClient.length; i++) {
        if (Connection.waitingClient[i]._id == id) {
            Connection.waitingClient.splice(i, 1);
            i--;
        }
    }
};
module.exports = Connection;