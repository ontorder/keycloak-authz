const HttpResource = require('./HttpResource'),
      KeycloakPermission = require("./KeycloakPermission");

class PermissionResource extends HttpResource {

    constructor(authzClient){
        super(authzClient, true);
        this._client = authzClient;
    }

    _getBaseUri(){
        return `/clients/${this._client.clientInfo.id}/authz/resource-server`;
    }

    create(permission){
       if(!permission) throw new Error("Permission is required");
       return this.post(`${this._getBaseUri()}/permission/${permission.type}`, permission.serialize()).then(response =>{
           return permission.setId(response.id);
       });
    }

    update(permission){
        if(!permission) throw new Error("Permission is required");
        return this.put(`${this._getBaseUri()}/permission/${permission.type}/${permission.id}`, permission.serialize()).then(response =>{
            return permission;
        });
    }

    search(term = {}, first=0, max=100){
      return this.get(`${this._getBaseUri()}/permission`, Object.assign(term, {first, max})).then(response =>{
           return response.map(item=>{
               return new KeycloakPermission(item);
           })
      })
    }

    associatedPolicies(permission){
        if(!permission) throw new Error("Permission is required");
        return this.get(`${this._getBaseUri()}/policy/${permission.id}/associatedPolicies`);
    }

    findById(permissionId, type = 'resource'){
        if(!permissionId) throw new Error("Permission Id is required");
        return this.get(`${this._getBaseUri()}/permission/${type}/${permissionId}`).then(response =>{
            return new KeycloakPermission(response);
        });
    }

    getScopes(permissionId){
        if(!permissionId) throw new Error("Permission Id is required");
        return this.get(`${this._getBaseUri()}/permission/${permissionId}/scopes`);
    }

    getResources(permissionId){
        if(!permissionId) throw new Error("Permission Id is required");
        return this.get(`${this._getBaseUri()}/permission/${permissionId}/resources`);
    }
}

module.exports = PermissionResource;