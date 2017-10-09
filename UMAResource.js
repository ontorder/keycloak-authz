const UMAScope = require("./UMAScope");

class UMAResource {


    constructor({name, _id = null, uri = null, type = null, icon_uri = null, owner = null, scopes = [] }){

        if(!name) throw new Error("ResourceSetName is required");

        this._name = name;
        this._uri = uri;
        this._type = type;
        this._scopes = [];
        this._iconUri = icon_uri;
        this._owner = owner;
        this._id = _id;

        this.setScopes(scopes)
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

        this._scopes = [];

        newScopes.forEach(scope =>{
            if(typeof scope === "string") this._scopes.push(new UMAScope({name: scope}));
            if(typeof scope === "object") this._scopes.push(new UMAScope(scope));
        });

        return this;

    }

    addScope(scopeName){
      if(!scopeName) throw new Error("Scope name is required");
      if(!this.hasScope(scopeName))
        this._scopes.push(new UMAScope({name: scopeName}));
      return this;
    }

    hasScope(scopeName){
        return !!this.scopes.filter(scope =>{
            return scope.name === scopeName;
        });
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

    get iconUri(){
        return this._iconUri;
    }

    setIconUri(newUri){
        if(!newUri) throw new Error("IconUri is required");
        this._iconUri = newUri;
        return this;
    }


    serialize(){
        return {
            name: this.name,
            uri: this.uri,
            type: this.type,
            icon_uri: this.iconUri,
            owner: this.owner,
            scopes: this.scopes,
            _id: this.id
        };
    }


    equal(object){
       return (object.name === this.name && object.id === this.id &&
               object.iconUri === this.iconUri &&
               object.owner === this.owner &&
               object.uri === this.uri && object.type === this.type);
    }

}

module.exports = UMAResource;