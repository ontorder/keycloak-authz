const UMAResource = require('./UMAResource'),
      HttpResource = require('./HttpResource');

class ProtectedResource extends HttpResource {

    constructor(authzClient){
        super(authzClient);
        this._client = authzClient;
    }

    create(resource){
        if(!resource || !(resource.name)) throw new Error("Resource is required");
        return this.post('/authz/protection/resource_set', resource.serialize(), this._client.realm)
            .then(({body}) =>{
                resource.setId(body['_id']);
                return resource;
            });
    }

    update(resource){
        if(!resource || !(resource.name)) throw new Error("Resource is required");
        return this.put("/authz/protection/resource_set/" + resource.id, resource.serialize(), this._client.realm)
            .then(() =>{
                return resource;
            });
    }

    findById(id){
        if(!id) throw new Error("Id is required");
        return this.get(`/authz/protection/resource_set/${id}`, this._client.realm).then(({body}) =>{
            if(!body) return false;
            return new UMAResource(body);
        }).catch(() => false);
    }

    findByFilter(filter){
        if(!filter) throw new Error("Filter is required");
        return this.get(`/authz/protection/resource_set`, {filter}, this._client.realm).then(({body}) =>{
            return Promise.all(body.map(id => this.findById(id)))
        });
    }

    findAll( deep = false ){
        return this.get(`/authz/protection/resource_set`, this._client.realm ).then(({body}) =>{
            if(!deep) return body;
            return Promise.all(body.map(id => this.findById(id)))
        });
    }

    deleteById(id){
        if(!id) throw new Error("Id is required");
        return this.delete("/authz/protection/resource_set/" + id);
    }

}

module.exports = ProtectedResource;