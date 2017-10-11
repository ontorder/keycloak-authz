const HttpResource = require('./HttpResource'),
      KeycloakPolicy = require("./KeycloakPolicy"),
      KeycloakUserPolicy = require('./KeycloakUserPolicy'),
      KeycloakGroupPolicy = require('./KeycloakGroupPolicy');

class PolicyResource extends HttpResource {

    constructor(authzClient){
        super(authzClient, true);
        this._client = authzClient;
    }

    _getBaseUri(){
        return `/clients/${this._client.clientInfo.id}/authz/resource-server`;
    }

    create(policy){
       if(!policy) throw new Error("Policy is required");
       return this.post(`${this._getBaseUri()}/policy/${policy.type}`, policy.serialize()).then(response =>{
           return policy.setId(response.id);
       });
    }

    update(policy){
        if(!policy) throw new Error("Policy is required");
        return this.put(`${this._getBaseUri()}/policy/${policy.type}/${policy.id}`, policy.serialize()).then(response =>{
            return policy;
        });
    }

    search(term = {}, first=0, max=100){
      return this.get(`${this._getBaseUri()}/policy`, Object.assign(term, {first, max})).then(response =>{
           return response.map(item=>{
               return new KeycloakPolicy(item);
           })
      })
    }

    getScopes(id){
        if(!id) throw new Error("Id is required");
        return this.get(`${this._getBaseUri()}/policy/${id}/scopes`);
    }

    getResources(id){
        if(!id) throw new Error("Id is required");
        return this.get(`${this._getBaseUri()}/policy/${id}/resources`);
    }

}

module.exports = PolicyResource;