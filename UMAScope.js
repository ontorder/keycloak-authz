class UMAScope {

    constructor({name, id = null, iconUri = null}){

        this.name = name;
        this.id = id;
        this.iconUri = iconUri;


    }


    equal(object){
        return this.name === object.name;
    }
}

module.exports = UMAScope;