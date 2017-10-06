const AuthzClient = require('../AuthzClient');

//TODO: make tests without keycloak running

describe("AuthzClient: composition of all required resources", function(){

    const config = {
        url: 'http://localhost:8080/auth',
        clientId: 'api',
        realm: 'master',
        credentials: {
            secret: "2ce80357-2204-49e2-8d73-d857a5be185d"
        }
    },

    configWithPassword = {
        url: 'http://localhost:8080/auth',
        clientId: 'admin-cli',
        realm: 'master',
        public: true,
        credentials: {
            username: "admin",
            password: "admin"
        }
    };


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


    it("Retrieves access token with client secret", function(done){

        expect(client.isAuthenticated()).toEqual(false);

        client.authenticate().then((result) => {
            expect(result).toEqual(true);
            expect(client.isAuthenticated()).toEqual(true);
            done();

        }).catch(error =>{
            console.error(error);
            expect(serviceAccountClient.isAuthenticated()).toEqual(true);
            done();
        });
    });

    it("Retrieves access token with password", function(done){
        let serviceAccountClient = new AuthzClient(configWithPassword);
        expect(serviceAccountClient.isAuthenticated()).toEqual(false);

        serviceAccountClient.authenticate().then((result) => {
            expect(result).toEqual(true);
            expect(serviceAccountClient.isAuthenticated()).toEqual(true);
            done();
        }).catch(error =>{
            console.log("error", error);
            expect(serviceAccountClient.isAuthenticated()).toEqual(true);
            done();
        });
    });

});