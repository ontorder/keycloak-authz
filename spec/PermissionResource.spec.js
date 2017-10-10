const AuthzClient = require('../AuthzClient'),
    config = require('./config'),
    KeycloakPermission = require('../KeycloakPermission'),
    KeycloakPolicy = require('../KeycloakPolicy'),
    PermissionResource = require('../PermissionResource');

describe("Permission REST client", function(){

    let resource = null, originalTimeout  = null, client = null, permission = null, policy = null;

    beforeAll((done) =>{

        client = new AuthzClient(config);
        client.authenticate().then(()=>{
            resource = new PermissionResource(client);
            policy =  new KeycloakPolicy({});
            policy.setName("testable policy "+ Math.random())
                .setType(KeycloakPolicy.type.JS_BASED)
                .setConfig({code: " $evaluation.grant(); "})
                .setLogic(KeycloakPolicy.logic.POSITIVE);

            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            done();
        });
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Allows to create permission", function(done){

        expect(()=>resource.create()).toThrowError("Permission is required");

        client.admin().policy().create(policy).then(()=>{
            permission = new KeycloakPermission({type: KeycloakPermission.type.RESOURCE_BASED});
            permission.setName(`Test permission ${Math.random()}`)
                .setDescription("Test resource permission")
                .setLogic(KeycloakPermission.logic.POSITIVE)
                .setResourceType("event")
                .addPolicy(policy.id);

            resource.create(permission).then(created =>{
                expect(created).toEqual(permission);
                expect(created.id).toBeTruthy();
                done();
            }).catch(err =>{
                expect(err).toBeFalsy();
                done();
            })


        });
    });

    it("Allows to update permission", function(done){

        expect(()=>resource.update()).toThrowError("Permission is required");

        permission.setName(`Updated ${Math.random()}`)
            .setDescription("Test permission UPDATED")
            .setLogic(KeycloakPermission.logic.NEGATIVE);
        resource.update(permission).then(created =>{
            expect(created).toEqual(permission);
            expect(created.id).toBeTruthy();
            done();
        }).catch(err =>{
            expect(err).toBeFalsy();
            done();
        })
    });

    it("Allows to search permission", function(done){
        resource.search({name: "test"}).then(result =>{
            expect(typeof result.length).toEqual("number");
            expect(result.length).toBeTruthy();
            done();
        }).catch(err =>{
            expect(err).toBeFalsy();
            done();
        })
    });

});