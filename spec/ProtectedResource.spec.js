const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    ProtectedResource = require('../ProtectedResource');

describe("UMA resource REST client", function(){

    let resource = null, originalTimeout  = null;

    beforeAll(() =>{
        const client = new AuthzClient(config);
        client.authenticate();

        resource = new ProtectedResource(client);

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Allows to create UMA resources", function(done){
        resource.create({}).then(resource =>{
            done();
        })
    });

});