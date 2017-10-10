const KeycloakPolicy = require('./KeycloakPolicy');

class KeycloakScriptPolicy extends KeycloakPolicy {

    constructor({id, name, description, logic, code }){
        super({id, name, description, logic, type: KeycloakPolicy.type.JS_BASED });
        this._code = code;
    }

    get code(){
        return this._code;
    }

    setCode(value){
        if(!value || typeof value !== "string") throw new Error("Code is required");
        this._code = value;
        return this;
    }

    /**
     * @override
     */
    serialize(){
        let obj = super.serialize();
        obj.code = this._code;
        return obj;
    }

}

module.exports = KeycloakScriptPolicy;