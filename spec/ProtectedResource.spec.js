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

        let res = new UMAResource({name: "Test " + Math.random()});
        res.setUri('/test/item/33ss')
            .setIconUri("http://example.com/img.png")
            .setType("event")
            .addScope("api:event:create")
            .addScope("api:event:delete")
            .addScope("api:event:manage");

        resource.create(res).then((response) =>{
            expect(response).toBeTruthy();
            expect(response).toEqual(res);
            expect(res.id).toBeTruthy();
            done();
        }).catch(error =>{
            expect(error).toBeFalsy();
            done();
        });

    });

});