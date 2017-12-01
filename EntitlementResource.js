const request = require('request-promise-native'),
      Token = require('./Token'),
      HttpResource = require('./HttpResource');

class EntitlementResource extends HttpResource {

    constructor(authzClient){
        super(authzClient);
    }

    /**
     * @override
     * @param uri
     * @param access_token
     */
    async get(uri, access_token){
        const options = {
            method: 'GET',
            uri: this._prepareUri(uri),
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            json: true
        };

        return await request(options);
    }

    async getAll(access_token, clientId = this._client.clientId){
        const response = await this.get(`/authz/entitlement/${clientId}`, access_token);
        return new Token(response.rpt, clientId);
    }

    _getEvaluatingBaseUri(clientIdentifier){

        return `clients/${clientIdentifier}/authz/resource-server/policy/evaluate`;

    }


    /** evaluate permissions via admin endpoint **/
    evaluate(body = {}, clientIdentifier = this._client.clientInfo.id ){
        let uri = `${this._client.url}/auth/admin/realms/${this._client.realm}/${this._getEvaluatingBaseUri(clientIdentifier)}`;
        return this._client.refreshGrant().then((grant)=>{
            let options = {
                method: 'POST',
                uri: uri,
                headers: {
                    "Authorization": `Bearer ${grant.access_token.token}`
                },
                body: body,
                json: true
            };
            return request(options);

        }).catch(response =>{

            throw response.error;

        });
    }

    async getByPermissions(access_token, permissions, clientId = this._client.clientId){

        const options = {
            method: 'POST',
            uri: this._prepareUri(`/authz/entitlement/${clientId}`),
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            body: {
                permissions: permissions
            },
            json: true
        };

        const response = await request(options);

        return new Token(response.rpt, clientId);

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