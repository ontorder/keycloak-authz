const request = require('request-promise-native');

class HttpUtils {

    constructor(authzClient){
        this._client = authzClient;
    }

    post(uri, body){
        let options = {
            method: 'POST',
            uri: `${this._client.url}/auth/realms/${this._client.realm}${uri}`,
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
}

module.exports = HttpUtils;