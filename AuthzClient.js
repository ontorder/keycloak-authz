const GrantManager = require('keycloak-auth-utils').GrantManager,
      KcConfig = require('keycloak-auth-utils').Config,
      ProtectedResource = require('./ProtectedResource'),
      AdminResource = require('./AdminResource'),
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
        this._protectedResource = null;
        this._entitlementResource = null;
        this._adminResource = null;

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
                return grant;
            });

    }

    refreshGrant(){
        return this._grantManager
            .ensureFreshness(this._grant)
            .then((freshGrant) =>{
                this._grant = freshGrant;
                return freshGrant;
            })
            .catch((e)=>{

                console.warn("Cannot refresh grant, re-auth", e);
                this._grant = null;
                return this.authenticate();

            })
            .catch(exception =>{

                console.error("Cannot refresh grant", exception);
                this._grant = null;

                throw exception;

            });
    }

    get resource(){
        this._protectedResource  =  this._protectedResource || new ProtectedResource(this);
        return this._protectedResource;
    }

    get entitlement(){
        this._entitlementResource = this._entitlementResource || new EntitlementResource(this);
        return this._entitlementResource;
    }

    get admin(){
        this._adminResource = this._adminResource || new AdminResource(this);
        return this._adminResource;
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