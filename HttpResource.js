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
        let options = {
            method: 'POST',
            uri: this._prepareUri(uri),
            headers: {
                "Authorization": `Bearer ${this._client.grant.access_token.token}`
            },
            body: body,
            json: true
        };
        return this._client.refreshGrant().then(()=>{
            return request(options);
        }).catch(response =>{
            console.error("Error happened during request", response.error.errorMessage);
            throw new Error(response.error.errorMessage);
        });
    }

    put(uri, body){
        let options = {
            method: 'PUT',
            uri: this._prepareUri(uri),
            headers: {
                "Authorization": `Bearer ${this._client.grant.access_token.token}`
            },
            body: body,
            json: true
        };
        return this._client.refreshGrant().then(()=>{
            return request(options);
        }).catch(response =>{
            console.error("Error happened during request", response.error);
            throw new Error(response.error.errorMessage);
        });
    }

    get(uri, queryParams = {}){
        let options = {
            method: 'GET',
            uri: this._prepareUri(uri),
            headers: {
                "Authorization": `Bearer ${this._client.grant.access_token.token}`
            },
            qs: queryParams,
            json: true
        };

        return this._client.refreshGrant().then(()=>{
            return request(options);
        }).catch(response =>{
            console.error("Error happened during request", response.error.errorMessage);
            throw new Error(response.error.errorMessage);
        });

    }
}

module.exports = HttpResource;