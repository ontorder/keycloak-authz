class UMAScope {

    constructor({name, _id = null, icon_uri = null}){

        this.name = name;
        this._id = _id;
        this.icon_uri = icon_uri;


    }


    equal(object){
        return this.name === object.name;
    }

    serialize(){
        let obj = {
            name: this.name
        };
        if(this._id) obj._id  = this._id;
        if(this.icon_uri) obj.icon_uri = this.icon_uri;
        return obj;
    }
}

module.exports = UMAScope;