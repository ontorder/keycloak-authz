const UMAResource = require('./UMAResource'),
      HttpUtils = require('./HttpUtils');

class ProtectedResource extends HttpUtils {

    constructor(authzClient){

        super(authzClient);
        this._client = authzClient;

    }


    create(resource){
        if(!resource || !(resource.name)) throw new Error("Resource is required");
        return this.post('/authz/protection/resource_set', resource.serialize())
            .then(response =>{
                resource.setId(response['_id']);
                return resource;
            });

    }


    update(resource){

        return true;
    }

    findById(id){

        return true;

    }

    findByFilter(filter){

        return true;
    }

    findAll(){

        return true;
    }

    delete(id){

        return true;

    }

}

module.exports = ProtectedResource;