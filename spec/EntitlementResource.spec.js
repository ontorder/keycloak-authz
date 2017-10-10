const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    EntitlementResource = require('../EntitlementResource');

describe("Entitlement api  REST client", function(){

    let resource = null, originalTimeout  = null, client = null, rpt = null;

    beforeAll((done) =>{

        client = new AuthzClient(config);
        client.authenticate().then(()=>{
            resource = new EntitlementResource(client);
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

            done();
        });
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Allows to fetch  Requesting Party Token ", function(done){
        resource.getAll(client.grant.access_token.token).then(response =>{
            expect(response.token).toBeTruthy();
            rpt = response;
            done();
        })
    });

    it("Allows to introspect  Requesting Party Token ", function(done){
        resource.introspectRequestingPartyToken(rpt.token).then(response =>{
            expect(response).toBeTruthy();
            done();
        }).catch(error => {
            console.error(error);
            done();
        })
    });


    it("Allows to validate token without introspection ", function(done){
        resource.validateToken(rpt).then((response) =>{
            expect(response.isExpired()).toEqual(false);
            done();
        }).catch(error =>{
            expect(error).toBeFalsy();
            done();
        })
    });
});