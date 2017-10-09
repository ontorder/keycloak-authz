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
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

            done();
        });
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Allows to fetch  Requesting Party Token ", function(done){
        resource.getAll(client.grant.access_token.token).then(response =>{
            expect(response.rpt).toBeTruthy();
            rpt = response.rpt;
            done();
        })
    });

    it("Allows to introspect  Requesting Party Token ", function(done){
        resource.introspectRequestingPartyToken(rpt).then(response =>{
            console.info(response);
            done();
        }).catch(error => {
            console.error(error);
            done();
        })
    });
});