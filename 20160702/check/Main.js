(function () {
    window.config={DATA_BASENAME:"MyDB",DATABASE_VERSION:1};
    function Main() {
        this.getElement();
        this.linkDataBase(this.gotDataBase.bind(this));
    }
    Main.prototype.gotDataBase=function () {
        this.addSubMitListeners();
        this.getData();
    };
    Main.prototype.addSubMitListeners=function () {
        this._form.onsubmit=function (event) {
            event.preventDefault();
            var trans=this._db.transaction("check","readwrite");
            var os=trans.objectStore("check");
            var request=os.put({name:this._form["name"].value,date:this._form["date"].value,money:this._form["money"].value,situation:this._form["situation"].value});
            request.onsuccess=function () {
                var div=document.createElement("div");
                div.id="d_state2";
                div.innerHTML="数据写入成功！";
                document.body.appendChild(div);
                this._form["name"].value=""; this._form["date"].value=""; this._form["money"].value=""; this._form["situation"].value="";
                this.getData();
            }.bind(this);
            request.onerror=function (event) {
                var div=document.createElement("div");
                div.id="d_state1";
                div.innerHTML="数据写入失败！";
                console.error(event);
                document.body.appendChild(div);

            }
        }.bind(this);
    };
    Main.prototype.getData=function () {
        var trans=this._db.transaction("check");
        var os=trans.objectStore("check");
        var request=os.getAll();
        request.onsuccess=function () {
            this.showTable(event.target.result);
        }.bind(this);
        request.onerror=function (event) {
            console.log(event);
        };
    };
    Main.prototype.showTable=function (data) {
        var table="<table id='table' cellspacing='0' border='1px'> <tr> <th>ID</th><th>姓名</th> <th>时间</th> <th>金额</th> <th>还款状态</th> <th>操作</th></tr>";
        for(var i=0;i<data.length;i++){
            table+="<tr><td class='id'>"+data[i].ID+"</td><td>"+data[i].name+"</td><td>"+data[i].date+"</td><td>"+data[i].money+"</td><td><input class='iptSituation' value='"+data[i].situation+"'></td><td class='iptDelete'>删除</td></tr>";
        }
        table+="</table>";
        this._tableContainer.innerHTML=table;
        this.addTableListener();
    };
    Main.prototype.addTableListener=function () {
        var self=this;
        var ids=document.getElementsByClassName("id");
        var iptState=document.getElementsByClassName("iptSituation");
        var iptDelete=document.getElementsByClassName("iptDelete");
        for(var i=0;i<iptState.length;i++){
            (function (m) {
                iptDelete[m].onclick=function () {
                    var os=self._db.transaction("check","readwrite").objectStore("check");
                    var request=os.delete(parseInt(ids[m].innerHTML));
                    request.onsuccess=function () {
                        console.log("删除数据成功！");
                        self.getData();
                    };
                    request.onerror=function (event) {
                        console.log("删除数据失败！",event);
                    }
                };
                iptState[m].onblur=function () {
                    var os=self._db.transaction("check","readwrite").objectStore("check");
                    var temp=os.get(parseInt(ids[m].innerHTML));
                    temp.onsuccess=function () {
                        if(temp.result.situation==this.value){
                            return ;
                        }
                        temp.result.situation=this.value;
                        request=os.put(temp.result);
                        request.onsuccess=function () {
                            console.log("数据修改成功！");
                            self.getData();
                        };
                    }.bind(this);
                    temp.onerror=function () {
                        console.log("数据修改失败！");
                    }
                };
            })(i);
        }
    };
    Main.prototype.getElement=function () {
        this._form=document.getElementById("form");
        this._tableContainer=document.getElementById("tableContainer");
    };
    Main.prototype.linkDataBase=function (fallback) {
        var request=indexedDB.open(config.DATA_BASENAME,config.DATABASE_VERSION);
        request.onsuccess=function (event) {
            console.log("数据库连接成功！");
            this._db=event.target.result;
            fallback();
        }.bind(this);
        request.onerror=function (event) {
            console.log("数据库连接失败！",event);
        };
        request.onupgradeneeded=function (event) {
            console.log("数据库初始化");
            var db=event.target.result;
            var os=db.createObjectStore("check",{keyPath:"ID",autoIncrement:true});
            os.createIndex("name","name");
            os.createIndex("date","date");
            os.createIndex("money","money");
            os.createIndex("situation","situation");
        }
    };
    new Main();
})();