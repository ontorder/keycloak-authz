
class AuthzClient {

    constructor({url, realm, clientId, credentials = {}}){
        if(!url) throw new Error("Required param is missing: url!");
        if(!realm) throw new Error("Required param is missing: realm");
        if(!clientId) throw new Error("Required param is missing: clientId");

        this._kcUrl = url;
        this._realm = realm;
        this._clientId = clientId;
        this._credentials = credentials;
    }
}

module.exports = AuthzClient;