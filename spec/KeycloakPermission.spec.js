const KeycloakPermission= require('../KeycloakPermission');

describe("Keycloak Permission  representation", function(){

    let resource = null;

    beforeAll(function(){

        resource = new KeycloakPermission({type: KeycloakPermission.type.RESOURCE_BASED});

    });

    it("Has policy type list", function(){
        let types = KeycloakPermission.type;
        expect(typeof types).toEqual("object");
        expect(types.RESOURCE_BASED).toEqual("resource");
    });

    it("Has policy logic list", function(){
        let logic = KeycloakPermission.logic;
        expect(typeof logic).toEqual("object");
        expect(logic.NEGATIVE).toEqual("NEGATIVE");
    });


    it("Has chainable method to manage name", function(){
        let name = "newName";
        expect(resource.name).toBeFalsy();
        expect(()=>resource.setName()).toThrowError("Name is required");
        expect(resource.setName(name)).toEqual(resource);
        expect(resource.name).toEqual(name);
    });

    it("Has chainable method to manage id", function(){
        let id = "newId";
        expect(resource.id).toBeFalsy();
        expect(()=>resource.setId()).toThrowError("Id is required");
        expect(resource.setId(id)).toEqual(resource);
        expect(resource.id).toEqual(id);
    });

    it("Has chainable method to manage description", function(){
        let description = "test";
        expect(resource.description).toBeFalsy();
        expect(()=>resource.setDescription()).toThrowError("Description is required");
        expect(resource.setDescription(description)).toEqual(resource);
        expect(resource.description).toEqual(description);
    });

    it("Has chainable method to manage logic", function(){
        let logic = KeycloakPermission.logic.NEGATIVE;
        expect(resource.logic).toEqual(KeycloakPermission.logic.POSITIVE);
        expect(()=>resource.setLogic()).toThrowError("Logic is required");
        expect(()=>resource.setLogic("incorrect value")).toThrowError("Logic is incorrect");
        expect(resource.setLogic(logic)).toEqual(resource);
        expect(resource.logic).toEqual(logic);
    });

    it("Has chainable method to manage type", function(){
        let type = KeycloakPermission.type.SCOPE_BASED;
        expect(resource.type).toEqual(KeycloakPermission.type.RESOURCE_BASED);
        expect(()=>resource.setType()).toThrowError("Type is required");
        expect(()=>resource.setType("incorrect value")).toThrowError("Type is incorrect");
        expect(resource.setType(type)).toEqual(resource);
        expect(resource.type).toEqual(type);
    });

    it("Has chainable method to manage policies", function(){
        expect(resource.policies).toEqual([]);
        expect(()=>resource.setPolicies()).toThrowError("Policies is required");

        expect(resource.setPolicies(["id","id2"])).toEqual(resource);
        resource.addPolicy("id3");
        expect(resource.policies).toEqual(["id","id2", "id3"]);
    });

    it("Has chainable method to manage resources", function(){
        expect(resource.resources).toEqual([]);
        expect(()=>resource.setResources()).toThrowError("Resources is required");

        expect(resource.setResources(["id","id2"])).toEqual(resource);
        resource.addResource("id3");
        expect(resource.resources).toEqual(["id","id2", "id3"]);
    });

    it("Has chainable method to manage scopes", function(){
        expect(resource.scopes).toEqual([]);
        expect(()=>resource.setScopes()).toThrowError("Scopes is required");

        expect(resource.setScopes(["id","id2"])).toEqual(resource);
        resource.addScope("id3");
        expect(resource.scopes).toEqual(["id","id2", "id3"]);
    });

    it("Has chainable method to manage resourceType", function(){
        expect(resource.resourceType).toBeFalsy();

        expect(()=>resource.setResourceType()).toThrowError("ResourceType is required");

        expect(resource.setResourceType("event")).toEqual(resource);

        expect(resource.resourceType).toEqual("event");
    });

    it("Has chainable method to manage type based config", function(){
        expect(resource.config).toEqual({});
        expect(()=>resource.setConfig()).not.toThrowError(Error);
        expect(resource.setConfig({})).toEqual(resource);
    });

    it("Can be serialized with type specific config", function(){
        expect(resource.serialize().name).toEqual(resource.name);
        expect(typeof resource.serialize().config).toEqual("undefined");
        resource.setConfig({
            any: "typeSpecofocConfigurationValue"
        });
        expect(resource.serialize().any).toEqual("typeSpecofocConfigurationValue");
    });
});
