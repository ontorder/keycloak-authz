class UMAResource {


    constructor({ name, uri = null, type = null, iconUri = null, owner = null, scopes = [] }){

        if(!name) throw new Error("ResourceSetName is required");

        this._name = name;
        this._uri = uri;
        this._type = type;
        this._scopes = scopes;
        this._iconUri = iconUri;
        this._owner = owner;
        this._id = null;
    }


    get name(){
        return this._name;
    }

    setName(newName){
        if(!newName) throw new Error("ResourceSetName is required");
        this._name = newName;
        return this;
    }

    get uri(){
        return this._uri;
    }

    setUri(newUri){
        if(!newUri) throw new Error("Uri is required");
        this._uri = newUri;
        return this;
    }

    get type(){
        return this._type;
    }

    setType(newType){
        if(!newType) throw new Error("Type is required");
        this._type = newType;
        return this;
    }


    get scopes(){
        return this._scopes;
    }

    setScopes(newScopes){
        newScopes  = newScopes || [];
        this._scopes = newScopes;
        return this;

    }

    addScope(scopeName){
      if(!scopeName) throw new Error("Scope name is required");
      if(!this._scopes.includes(scopeName)) this._scopes.push(scopeName);
      return this;
    }

    get owner(){
        return this._owner;
    }

    setOwner(newOwner){
        if(!newOwner) throw new Error("Owner is required");
        this._owner = newOwner;
        return this;
    }

    get id(){
        return this._id;
    }

    setId(newId){
        if(!newId) throw new Error("Id is required");
        this._id = newId;
        return this;
    }

}

module.exports = UMAResource;