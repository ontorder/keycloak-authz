const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    UMAResource = require('../UMAResource'),
    ProtectedResource = require('../ProtectedResource');

describe("UMA resource REST client", function(){

    let resource = null, originalTimeout  = null;

    beforeAll((done) =>{

        const client = new AuthzClient(config);
        client.authenticate().then(()=>{
            resource = new ProtectedResource(client);
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

            done();
        });
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Allows to create UMA resources", function(done){
        expect(()=> resource.create({})).toThrowError("Resource is required");

        let res = new UMAResource({name: "MyAwesomeResource 33"});
        res.setUri('/events/item/33')
            .setIconUri("http://example.com")
            .setType("event")
            .addScope("urn:api:create");

        resource.create(res).then((response) =>{
            expect(response).toBeTruthy()
            done();
        }).catch(error =>{
            expect(error).toBeFalsy()
            done();
        });

    });

});