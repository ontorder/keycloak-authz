const HttpResource = require('./HttpResource');

class PolicyResource extends HttpResource {

    constructor(authzClient){
        super(authzClient, true);
        this._client = authzClient;
    }

    create(policy){
       // TODO
    }

    update(policy){
        //TODO
    }

    search(term){
        //TODO
    }

    getAssociatedPolicies(id){
        //TODO
    }

    getDependentPolicies(id){
        //TODO
    }

    getScopes(id){
        //TODO
    }

    getResources(id){
        //TODO
    }
}

module.exports = PolicyResource;