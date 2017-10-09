const UMAResource = require('./UMAResource'),
      HttpResource = require('./HttpResource');

class ProtectedResource extends HttpResource {

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
        if(!resource || !(resource.name)) throw new Error("Resource is required");
        return this.put("/authz/protection/resource_set/" + resource.id, resource.serialize())
            .then(() =>{
                return resource;
            });
    }

    findById(id){
        if(!id) throw new Error("Id is required");
        return this.get(`/authz/protection/resource_set/${id}`).then(response =>{
            return new UMAResource(response);
        });
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