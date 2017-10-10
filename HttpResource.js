const request = require('request-promise-native');

class HttpResource {

    constructor(authzClient, isAdminResource = false){
        this._isAdminResource = isAdminResource;
        this._client = authzClient;
    }

    _prepareUri(requestedPath){
        let uri = `${this._client.url}/auth/`;
        if(this._isAdminResource) uri += 'admin/';
        uri += `realms/${this._client.realm}${requestedPath}`;
        return uri;
    }

    post(uri, body){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'POST',
                uri: this._prepareUri(uri),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                body: body,
                json: true
            };
            return request(options);
        }).catch(response =>{
            throw new Error(response.error);
        });
    }

    put(uri, body){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'PUT',
                uri: this._prepareUri(uri),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                body: body,
                json: true
            };
            return request(options);
        }).catch(response =>{
            throw new Error(response.error);
        });
    }

    get(uri, queryParams = {}){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'GET',
                uri: this._prepareUri(uri),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                qs: queryParams,
                json: true
            };
            return request(options);
        }).catch(response =>{
            throw new Error(response.error.errorMessage);
        });

    }

    delete(uri){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'DELETE',
                uri: this._prepareUri(uri),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                json: true
            };
            return request(options);
        }).catch(response =>{
            throw new Error(response.error.errorMessage);
        });
    }
}

module.exports = HttpResource;