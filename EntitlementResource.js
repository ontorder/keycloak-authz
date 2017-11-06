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
            throw new Error(response.error.errorMessage);
        });
    }

    getAll(access_token){
        return this.get("/authz/entitlement/" + this._client.clientId, access_token).then((response) =>{
            return  new Token(response.rpt, this._client.clientId);
        });
    }

    _getEvaluatingBaseUri(){
        return `/clients/${this._client.clientInfo.id}/authz/resource-server/policy/evaluate`;
    }

    /*** Hack:  custom protected request via admin evaluation api **/
    getByResourceType(userId, resourceType, context = {}, clientId = this._client.clientId){

        let uri = `${this._client.url}/auth/admin/realms/${this._client.realm}/${this._getEvaluatingBaseUri()}`;

        this._client.refreshGrant().then(()=>{
            let options = {
                method: 'POST',
                uri: uri,
                headers: {
                    "Authorization": `Bearer ${this._client.grant.access_token.token}`
                },
                json: true,
                body: {
                    clientId: clientId,
                    context: {
                        attributes: context
                    },
                    userId: userId,
                    resources: [
                        {
                           type: resourceType,
                           scope: []
                        }
                    ]
                }
            };
            return request(options);
            
        }).catch(response =>{
            throw new Error(response.error.errorMessage);
        });


    }

    getByPermissions(access_token, permissions, clientId = this._client.clientId){
        this._client.refreshGrant().then(()=>{
            let options = {
                method: 'POST',
                uri: this._prepareUri('/authz/entitlement/' + clientId),
                headers: {
                    "Authorization": `Bearer ${access_token}`
                },
                json: true,
                body: {
                    permissions: permissions
                }
            };
            return request(options);
        }).catch(response =>{
            throw new Error(response.error.errorMessage);
        });
    }


    validateToken(token){
        if(typeof token === "string"){
            token = new Token(token, this._client.clientId, this._client.realIss);
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