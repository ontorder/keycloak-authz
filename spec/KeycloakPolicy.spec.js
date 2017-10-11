const KeycloakPolicy = require('../KeycloakPolicy'),
      KeycloakScriptPolicy = require("../KeycloakScriptPolicy"),
      KeycloakUserPolicy = require("../KeycloakUserPolicy"),
      KeycloakGroupPolicy = require("../KeycloakGroupPolicy");

describe("Keycloak Policy  representation", function(){

    let resource = null;

    beforeAll(function(){
        resource = new KeycloakPolicy({type: KeycloakPolicy.type.USER_BASED});
    });

    it("Has policy type list", function(){
        let types = KeycloakPolicy.type;
        expect(typeof types).toEqual("object");
        expect(types.JS_BASED).toEqual("js");
    });

    it("Has policy logic list", function(){
        let logic = KeycloakPolicy.logic;
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
        let logic = KeycloakPolicy.logic.NEGATIVE;
        expect(resource.logic).toEqual(KeycloakPolicy.logic.POSITIVE);
        expect(()=>resource.setLogic()).toThrowError("Logic is required");
        expect(()=>resource.setLogic("incorrect value")).toThrowError("Logic is incorrect");
        expect(resource.setLogic(logic)).toEqual(resource);
        expect(resource.logic).toEqual(logic);
    });

    it("Has chainable method to manage type", function(){
        let type = KeycloakPolicy.type.USER_BASED;
        expect(resource.type).toEqual(KeycloakPolicy.type.USER_BASED);
        expect(()=>resource.setType()).toThrowError("Type is required");
        expect(()=>resource.setType("incorrect value")).toThrowError("Type is incorrect");
        expect(resource.setType(type)).toEqual(resource);
        expect(resource.type).toEqual(type);
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

describe("Keycloak User based Policy representation", function(){
    let resource = null;

    beforeAll(function(){
        resource = new KeycloakUserPolicy({name: "testPolicy"});
    });

    it("Has chainable method to manage users", function(){
        let users = [];
        expect(resource.users).toEqual([]);
        expect(()=>resource.setUsers()).toThrowError("Users is required");
        expect(resource.setUsers(users)).toEqual(resource);
        expect(resource.addUser("test")).toEqual(resource);
        expect(resource.users).toEqual(["test"]);
    });

    it("Has correct type", function(){
        expect(resource.type).toEqual(KeycloakUserPolicy.type.USER_BASED);
    });

    it("Can be serialized with type specific config", function(){
        expect(resource.serialize().name).toEqual(resource.name);
        expect(typeof resource.serialize().config).toEqual("undefined");
        expect(resource.serialize().users).toEqual(["test"]);
    });

});

describe("Keycloak Script based Policy representation", function(){
    let resource = null;

    beforeAll(function(){
        resource = new KeycloakScriptPolicy({name: "testPolicy", code: "alert('Hello World!')"});
    });

    it("Has chainable method to manage code", function(){
        let code = "var a = 33;";
        expect(resource.code).toEqual("alert('Hello World!')");
        expect(()=>resource.setCode()).toThrowError("Code is required");
        expect(resource.setCode(code)).toEqual(resource);
        expect(resource.code).toEqual(code);
    });

    it("Has correct type", function(){
        expect(resource.type).toEqual(KeycloakUserPolicy.type.JS_BASED);
    });

    it("Can be serialized with type specific config", function(){
        expect(resource.serialize().name).toEqual(resource.name);
        expect(typeof resource.serialize().config).toEqual("undefined");
        expect(resource.serialize().code).toBeTruthy();
    });

});

describe("Keycloak Group based Policy representation", function(){
    let resource = null;

    beforeAll(function(){
        resource = new KeycloakGroupPolicy({name: "testPolicy"});
    });

    it("Has chainable method to manage groups", function(){
        let groups = ["test"];
        expect(resource.groups).toEqual([]);
        expect(()=>resource.setGroups()).toThrowError("Groups is required");
        expect(resource.setGroups(groups)).toEqual(resource);
        expect(resource.groups).toEqual(groups);
    });

    it("Has correct type", function(){
        expect(resource.type).toEqual(KeycloakUserPolicy.type.GROUP_BASED);
    });

    it("Can be serialized with type specific config", function(){
        expect(resource.serialize().name).toEqual(resource.name);
        expect(typeof resource.serialize().config).toEqual("undefined");
        expect(resource.serialize().groups).toBeTruthy();
    });

});