const GrantManager = require('keycloak-auth-utils').GrantManager,
      KcConfig = require('keycloak-auth-utils').Config,
      ProtectedResource = require('./ProtectedResource');

class AuthzClient {

    constructor({url, realm, clientId, credentials = {}, publicClient = false}){

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
    }

    isAuthenticated(){

        return !!(this._grant && !this._grant.isExpired());

    }


    authenticate(){

        if(this.isAuthenticated()) return Promise.resolve(true);

        const config = new KcConfig({
            realm: this._realm,
            clientId: this._clientId,
            secret: this._credentials.secret,
            serverUrl: this._kcUrl + "/auth",
            public: this._public
        });

        this._grantManager = new GrantManager(config);

        let promise = Promise.resolve(false);

        if ( this._credentials.password ) {
            promise = this._grantManager.obtainDirectly( this._credentials.username, this._credentials.password );
        } else {
            promise = this._grantManager.obtainFromClientCredentials();
        }

        return promise.then((grant) =>{
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
            .catch(exception =>{
                console.error("Cannot refresh grant", exception);
                this._grant = false;
                return false;
            });
    }

    userInfo(token = this._grant.access_token.token ){
        return this._grantManager
            .userInfo(token)
    }


    resource(){
        if(!this.isAuthenticated()) throw new Error("Authentication required");
        return this._protectedResource;
    }

    get grant(){
        if(!this.isAuthenticated()) throw new Error("Authentication required");
        return this._grant;
    }

    get url(){
        return this._kcUrl;
    }

    get realm(){
       return this._realm;
    }
}

module.exports = AuthzClient;