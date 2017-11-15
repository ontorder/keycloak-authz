const GrantManager = require('keycloak-auth-utils').GrantManager,
      KcConfig = require('keycloak-auth-utils').Config,
      ProtectedResource = require('./ProtectedResource'),
      EntitlementResource = require('./EntitlementResource');

class AuthzClient {

    constructor({url, realm, clientId, credentials = {}, publicClient = false }){

        if(!url) throw new Error("Required param is missing: url");
        if(!realm) throw new Error("Required param is missing: realm");
        if(!clientId) throw new Error("Required param is missing: clientId");

        this._kcUrl = url;
        this._realm = realm;
        this._clientId = clientId;
        this._credentials = credentials;
        this._public = publicClient;
        this._grant = null;
        this._grantManager = null;
        this._protectedResource = new ProtectedResource(this);
        this._entitlementResource = new EntitlementResource(this);

    }

    isAuthenticated(){
        return !!(this._grant);
    }

    authenticate(){

        if(this.isAuthenticated() && !this._grant.isExpired()) return Promise.resolve(true);

        const config = new KcConfig({
            realm: this._realm,
            clientId: this._clientId,
            secret: this._credentials.secret,
            serverUrl: this._kcUrl + "/auth",
            public: this._public
        });

        this._grantManager = this._grantManager || new GrantManager(config);

        return this._grantManager
            .obtainFromClientCredentials()
            .then((grant) =>{
                this._grant = grant;
                return true;
            });

    }

    refreshGrant(){
        return this._grantManager
            .ensureFreshness(this._grant)
            .then((freshGrant) =>{
                this._grant.update(freshGrant);
                return true;
            })
            .catch(()=>{

                return this.authenticate();

            })
            .catch(exception =>{
                console.error("Cannot refresh grant", exception);
                this._grant = false;

                throw exception;

            });
    }

    async resource(){
        await this.authenticate();
        return this._protectedResource;
    }

    async entitlement(){
        await this.authenticate();
        return this._entitlementResource;
    }


    get grant(){

        return this._grant;
    }

    get url(){
        return this._kcUrl;
    }

    get clientId(){
        return this._clientId;
    }

    get realm(){
       return this._realm;
    }

    get grantManager(){
        return this._grantManager;
    }

    get credentials(){
        return this._credentials;
    }

    get clientInfo(){
        return {};
    }
}

module.exports = AuthzClient;