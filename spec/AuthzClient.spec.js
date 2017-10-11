const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    ProtectedResource = require('../ProtectedResource');

//TODO: make tests without keycloak running

describe("AuthzClient composition", function(){

    let client = null, originalTimeout  = null;

    beforeAll(() =>{
        client = new AuthzClient(config);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("Checks for required parameters", function(){
        expect(() => new AuthzClient({})).toThrowError("Required param is missing: url");
        expect(() => new AuthzClient({url: "test"})).toThrowError("Required param is missing: realm");
        expect(() => new AuthzClient({url: "test", realm: "master"})).toThrowError("Required param is missing: clientId");
        expect(() => new AuthzClient({url: "test", clientId: "test", realm: "master"})).not.toThrowError(Error);
    });

    it("Does not allow to get current grant without auth", function(){
        expect(() => client.grant).toThrowError("Authentication required");
    });

    it("Does not allow to manage protected resources without authentication", function(){
        expect(() => client.resource()).toThrowError("Authentication required");
    });

    it("Retrieves access token with client secret", function(done){
        expect(client.isAuthenticated()).toEqual(false);
        client.authenticate().then((result) => {
            expect(result).toEqual(true);
            expect(client.isAuthenticated()).toEqual(true);
            done();
        }).catch(error =>{
            console.error(error);
            expect(client.isAuthenticated()).toEqual(true);
            done();
        });
    });

    it("Allows to manage protected resources with authentication", function(){
        const resource = client.resource();
        expect(resource instanceof ProtectedResource).toEqual(true);
        expect(client.resource()).toEqual(resource);
    });

    it("Allows to manage entitlement resources with authentication", function(){
        const resource = client.entitlement();
        expect(client.entitlement()).toEqual(resource);
    });

    it("Allows to access admin namespace with authentication", function(){
        const resource = client.admin();
        expect(client.admin()).toEqual(resource);
    });

    it("Allows to ensure freshness of access token", function(done){
        client.refreshGrant().then(result => {
            expect(result).toBeTruthy();
            expect(client.isAuthenticated()).toEqual(true);
            done();
        });
    });

    it("Allows to get current grant", function(){
        expect(client.grant).toBeTruthy();
    });

    it("Allows to get grant manager", function(){
        expect(client.grantManager).toBeTruthy();
    });

    it("Allows to get clientId && credentials", function(){
        expect(client.clientId).toBeTruthy();
        expect(client.credentials).toBeTruthy();
    });

    it("Allows to get keycloak url", function(){
        expect(client.url).toEqual(config.url);
    });

    it("Retrieves client info async", function(done){
        client.getClientInfo().then(info =>{
            expect(info.id).toBeTruthy();
            done();
        }).catch(exception =>{
            expect(exception).toBeFalsy();
            done();
        })
    });

    it("Allows to access to client info", function(){
        expect(client.clientInfo).toBeTruthy();
    });

});