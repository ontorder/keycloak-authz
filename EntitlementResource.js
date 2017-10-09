const request = require('request-promise-native'),
      HttpResource = require('./HttpResource');

class EntitlementResource extends HttpResource {

    constructor(authzClient){

        super(authzClient);
        this._client = authzClient;

    }

    /**
     * @override
     * @param uri
     */
    get(uri, access_token){
        let options = {
            method: 'GET',
            uri: this._prepareUri(uri),
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            json: true
        };

        return this._client.refreshGrant().then(()=>{
            return request(options);
        }).catch(response =>{
            console.error("Error happened during request", response);
            throw new Error(response.error.errorMessage);
        });
    }




    getAll(access_token){
        return this.get("/authz/entitlement/" + this._client.clientId, access_token)
    }

    introspectRequestingPartyToken(rpt){
        let options = {
            method: 'POST',
            uri: `${this._client.url}/auth/realms/test/protocol/openid-connect/token/introspect`,
            headers: {
             "Authorization": 'Basic ' + new Buffer(this._client.clientId + ':' + this._client._credentials.secret).toString('base64'),
             'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
               "token_type_hint": "requesting_party_token",
                "token": rpt
            },
            json: true
        };

        return this._client.refreshGrant().then(()=>{
            return request(options);
        }).catch(response =>{
            console.error("Error happened during request", response);
            throw new Error(response.error);
        });
    }

}

module.exports = EntitlementResource;