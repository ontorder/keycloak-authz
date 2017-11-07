const request = require('request-promise-native'),
      Token = require('./Token'),
      HttpResource = require('./HttpResource');

class EntitlementResource extends HttpResource {

    constructor(authzClient){
        super(authzClient);
        this._client = authzClient;
    }

    /**
     * @override
     * @param uri
     * @param access_token
     */
    get(uri, access_token){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'GET',
                uri: this._prepareUri(uri),
                headers: {
                    "Authorization": `Bearer ${access_token}`
                },
                json: true
            };
            return request(options);
        }).catch(response =>{
            console.error(response.error);
            throw response.error;
        });
    }

    getAll(access_token){
        return this.get("/authz/entitlement/" + this._client.clientId, access_token).then(response =>{
            let tok =  new Token(response.rpt, this._client.clientId);
            console.info(tok);
            return tok;
        });
    }

    _getEvaluatingBaseUri(clientIdentifier){
        return `clients/${clientIdentifier}/authz/resource-server/policy/evaluate`;
    }


    /** evaluate permissions via admin endpoint **/
    evaluate(body = {}, clientIdentifier = this._client.clientInfo.id ){
        let uri = `${this._client.url}/auth/admin/realms/${this._client.realm}/${this._getEvaluatingBaseUri(clientIdentifier)}`;
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'POST',
                uri: uri,
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                body: body,
                json: true
            };
            return request(options);

        }).catch(response =>{
            
            throw response.error;

        });
    }

    getByPermissions(access_token, permissions, clientId = this._client.clientId){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'POST',
                uri: this._prepareUri('/authz/entitlement/' + clientId),
                headers: {
                    "Authorization": `Bearer ${access_token}`
                },
                body: {
                    permissions: permissions
                },
                json: true
            };
            return request(options);
        }).catch(response =>{
            console.error(response.error);
            throw response.error;
        });
    }


    validateToken(token){
        if(typeof token === "string"){
            token = new Token(token, this._client.clientId, this._client.grantManager.realmUrl);
        }
        return this._client.grantManager.validateToken(token);
    }

    introspectRequestingPartyToken(rpt){
        return this._client.refreshGrant().then(()=>{
            let options = {
                method: 'POST',
                uri: `${this._client.url}/auth/realms/${this._client.realm}/protocol/openid-connect/token/introspect`,
                headers: {
                    "Authorization": 'Basic ' + new Buffer(this._client.clientId + ':' + this._client.credentials.secret).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                form: {
                    "token_type_hint": "requesting_party_token",
                    "token": rpt
                },
                json: true
            };
            return request(options);
        }).catch(response =>{
            throw new Error(response.error);
        });
    }

}

module.exports = EntitlementResource;