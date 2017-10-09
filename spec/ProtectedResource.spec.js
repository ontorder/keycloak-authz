const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    UMAResource = require('../UMAResource'),
    ProtectedResource = require('../ProtectedResource');

describe("UMA resource REST client", function(){

    let resource = null, originalTimeout  = null, createdResource = null;

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

        createdResource = res;

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


    it("Allows to update UMA resources", function(done){
        expect(()=> resource.update({})).toThrowError("Resource is required");

        createdResource.setName("Name updated " + Math.random());

        resource.update(createdResource).then((response) =>{
            expect(response).toBeTruthy();
            expect(response).toEqual(createdResource);
            done();
        }).catch(error =>{
            expect(error).toBeFalsy();
            done();
        });

    });


    it("Allows to find UMA resource by ID", function(done){
        expect(()=> resource.findById()).toThrowError("Id is required");

        resource.findById(createdResource.id).then((response) =>{
            expect(response).toBeTruthy();
            expect(createdResource.equal(response)).toEqual(true);
            done();
        }).catch(error =>{
            expect(error).toBeFalsy();
            done();
        });

    });

});