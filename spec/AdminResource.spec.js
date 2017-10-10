const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    AdminResource = require('../AdminResource');

describe("Admin namespace REST client", function(){

    let resource = null, originalTimeout  = null, client = null, rpt = null;

    beforeAll((done) =>{

        client = new AuthzClient(config);
        client.authenticate().then(()=>{
            resource = new AdminResource(client);
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            done();
        });
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Allows to manage authz policies", function(){
        expect(typeof resource.policy()).toEqual("object");
        expect(typeof resource.policy().create).toEqual("function");
    });

    it("Allows to manage authz permissions", function(){
        expect(typeof resource.permission()).toEqual("object");
        expect(typeof resource.permission().create).toEqual("function");
    });

});