const KeycloakPolicy = require('./KeycloakPolicy');

class KeycloakUserPolicy extends KeycloakPolicy {

    constructor({id, name, description, logic, users = [] }){
        super({id, name, description, logic, type: KeycloakPolicy.type.USER_BASED });
        this._users = users;
    }

    get users(){
        return this._users;
    }

    setUsers(value){
        if(!value) throw new Error("Users is required");
        this._users = value;
        return this;
    }

    addUser(value){
        if(value) this._users.push(value);
        return this;
    }

    /**
     * @override
     */
    serialize(){
        let obj = super.serialize();
        obj.users = this._users;
        return obj;
    }

}

module.exports = KeycloakUserPolicy;