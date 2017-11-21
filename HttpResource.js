const request = require('request');

class HttpResource {

    constructor(authzClient, isAdminResource = false){
        this._isAdminResource = isAdminResource;
        this._client = authzClient;
    }

    _prepareUri(requestedPath, realm  ){

        realm = realm || this._client.realm;
        let uri = `${this._client.url}/auth/`;
        if(this._isAdminResource) uri += 'admin/';
        uri += `realms/${realm}${requestedPath}`;
        return uri;
    }

    post(uri, body, realm){
        return this._client.refreshGrant().then(()=>{
            const options = {
                method: 'POST',
                uri: this._prepareUri(uri, realm),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                body: body,
                json: true
            };

            return new Promise((resolve, reject) =>{
                request(options, (err, response, body ) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve( { body, response } );
                });
            });


        }).catch(response =>{
            throw new Error(response.error);
        });
    }

    put(uri, body, realm){
        return this._client.refreshGrant().then(()=>{
            const options = {
                method: 'PUT',
                uri: this._prepareUri(uri, realm),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                body: body,
                json: true
            };

            return new Promise((resolve, reject) =>{
                request(options, (err, response, body ) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve( { body, response } );
                });
            });

        }).catch(response =>{
            throw new Error(response.error);
        });
    }

    get(uri, queryParams = {}, realm){
        return this._client.refreshGrant().then(()=>{
            const options = {
                method: 'GET',
                uri: this._prepareUri(uri, realm),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                qs: queryParams,
                json: true
            };

            return new Promise((resolve, reject) =>{
                request(options, (err, response, body ) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve({ body, response });
                });
            });

        }).catch(response =>{
            throw new Error(response.error.errorMessage);
        });
    }

    delete(uri, body = {},  realm){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'DELETE',
                uri: this._prepareUri(uri, realm),
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                body,
                json: true
            };

            return new Promise((resolve, reject) =>{
                request(options, (err, response, body ) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve( { body, response } );
                });
            });

        }).catch(response =>{
            throw new Error(response.error.errorMessage);
        });
    }
}

module.exports = HttpResource;