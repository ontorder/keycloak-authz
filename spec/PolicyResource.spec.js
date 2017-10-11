const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    KeycloakPolicy = require('../KeycloakPolicy'),
    PolicyResource = require('../PolicyResource');

describe("Policy REST client", function(){

    let resource = null, originalTimeout  = null, client = null, policy = null;

    beforeAll((done) =>{
        client = new AuthzClient(config);
        client.authenticate().then(()=>{
            resource = new PolicyResource(client);
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            done();
        });
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("Allows to create policy", function(done){
        expect(()=>resource.create()).toThrowError("Policy is required");
        policy = new KeycloakPolicy({type: KeycloakPolicy.type.JS_BASED})
        policy.setName(`Test ${Math.random()}`)
            .setDescription("Test script based policy")
            .setLogic(KeycloakPolicy.logic.POSITIVE)
            .setConfig({
                code: "\n$evaluation.grant();\n"
            });
        resource.create(policy).then(created =>{
            expect(created).toEqual(policy);
            expect(created.id).toBeTruthy();
            done();
        }).catch(err =>{
            expect(err).toBeFalsy();
            done();
        })
    });

    it("Allows to update policy", function(done){
        expect(()=>resource.update()).toThrowError("Policy is required");
        policy.setName(`Test ${Math.random()}`)
            .setDescription("Test script based policy UPDATED")
            .setLogic(KeycloakPolicy.logic.NEGATIVE)
            .setConfig({
                code: "\n$evaluation.grant(); //updated \n"
            });
        resource.update(policy).then(created =>{
            expect(created).toEqual(policy);
            expect(created.id).toBeTruthy();
            done();
        }).catch(err =>{
            expect(err).toBeFalsy();
            done();
        })
    });

    it("Allows to search policies", function(done){
        resource.search({name: "test"}).then(policies =>{
            expect(typeof policies.length).toEqual("number");
            expect(policies.length).toBeTruthy();
            done();
        }).catch(err =>{
            expect(err).toBeFalsy();
            done();
        })
    });

});