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
            if(!response) return false;
            return new UMAResource(response);
        }).catch(() => false);
    }

    findByFilter(filter){
        if(!filter) throw new Error("Filter is required");
        return this.get(`/authz/protection/resource_set`, {filter}).then(response =>{
            return Promise.all(response.map(id => this.findById(id)))
        });
    }

    findAll( deep = false ){
        return this.get(`/authz/protection/resource_set`).then(response =>{
            if(!deep) return response;
            return Promise.all(response.map(id => this.findById(id)))
        });
    }

    deleteById(id){
        if(!id) throw new Error("Id is required");
        return this.delete("/authz/protection/resource_set/" + id);
    }

}

module.exports = ProtectedResource;