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

        const options = {
            method: 'POST',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": 'Basic ' + new Buffer(this._client.clientId + ':' + this._client.credentials.secret).toString('base64'),
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

    }

    put(uri, body, realm){

        const options = {
            method: 'PUT',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": 'Basic ' + new Buffer(this._client.clientId + ':' + this._client.credentials.secret).toString('base64'),
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

    }

    get(uri, queryParams = {}, realm){


        const options = {
            method: 'GET',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": 'Basic ' + new Buffer(this._client.clientId + ':' + this._client.credentials.secret).toString('base64'),
            },
            qs: queryParams,
            json: true
        };

        return  new Promise((resolve, reject) =>{
            request(options, (err, response, body ) => {
                if (err) {
                    return reject(err);
                }

                return resolve({ body, response });
            });
        });


    }

    delete(uri, body = {},  realm){

        const options = {
            method: 'DELETE',
            uri: this._prepareUri(uri, realm),
            headers: {
                "Authorization": 'Basic ' + new Buffer(this._client.clientId + ':' + this._client.credentials.secret).toString('base64'),
            },
            body,
            json: true
        };

        return  new Promise((resolve, reject) =>{
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