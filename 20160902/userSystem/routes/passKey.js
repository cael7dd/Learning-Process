/**
 * Created by 87676 on 9/1/2016.
 */
var passKey = {users: {},
    setKey:function (name, pass) {
        this.users[name] = pass;
    },
    getKey:function (name) {
        return this.users[name];
    }
};
module.exports = passKey;