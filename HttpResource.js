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

    async post(uri, body, realm){

        const grant = await this._client.refreshGrant();

        const options = {
            method: 'POST',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": `Bearer ${grant.access_token.token}`
            },
            body: body,
            json: true
        };

        return await new Promise((resolve, reject) =>{
            request(options, (err, response, body ) => {
                if (err) {
                    return reject(err);
                }

                return resolve( { body, response } );
            });
        });

    }

    async put(uri, body, realm){

        const grant = await this._client.refreshGrant();
        const options = {
            method: 'PUT',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": `Bearer ${grant.access_token.token}`
            },
            body: body,
            json: true
        };

        return await new Promise((resolve, reject) =>{
            request(options, (err, response, body ) => {
                if (err) {
                    return reject(err);
                }

                return resolve( { body, response } );
            });
        });

    }

    async get(uri, queryParams = {}, realm){

        const grant = await this._client.refreshGrant();

        const options = {
            method: 'GET',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": `Bearer ${grant.access_token.token}`
            },
            qs: queryParams,
            json: true
        };

        return await new Promise((resolve, reject) =>{
            request(options, (err, response, body ) => {
                if (err) {
                    return reject(err);
                }

                return resolve({ body, response });
            });
        });


    }

    async delete(uri, body = {},  realm){

        const grant = await this._client.refreshGrant();

        const options = {
            method: 'DELETE',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": `Bearer ${grant.access_token.token}`
            },
            body,
            json: true
        };

        return await new Promise((resolve, reject) =>{
            request(options, (err, response, body ) => {
                if (err) {
                    return reject(err);
                }

                return resolve( { body, response } );
            });
        });

    }
}

module.exports = HttpResource;