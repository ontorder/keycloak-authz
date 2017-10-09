const UMAResource = require('../UMAResource');

describe("UMA Resource representation", function(){

    let resource = null;
    const resourceName = "test Resource";

    beforeAll(function(){

        resource = new UMAResource({name: resourceName});

    });

    it("Validates constructor parameters", function(){

        expect(() => new UMAResource({})).toThrowError("ResourceSetName is required");

        expect(() => new UMAResource({name: "myAwesomeResource"})).not.toThrowError("ResourceSetName is required");

    });


    it("Allows to read/write resourceSetName", function(){
        let  newName = "changedName";
        expect(resource.name).toEqual(resourceName);

        resource.setName(newName);

        expect(resource.name).toEqual(newName);

        expect(()=> resource.setName(null)).toThrowError("ResourceSetName is required");

    });

    it("Allows to read/write uri", function(){
        let  uri = "/photoz/item/133";

        expect(resource.uri).toEqual(null);

        resource.setUri(uri);

        expect(resource.uri).toEqual(uri);

        expect(()=> resource.setUri(null)).toThrowError("Uri is required");

    });

    it("Allows to read/write iconUri", function(){
        let  uri = "https://img.com/example.png";

        expect(resource.iconUri).toEqual(null);

        resource.setIconUri(uri);

        expect(resource.iconUri).toEqual(uri);

        expect(()=> resource.setIconUri(null)).toThrowError("IconUri is required");

    });

    it("Allows to read/write type", function(){

        let  type = "photoItem";

        expect(resource.type).toEqual(null);

        resource.setType(type);

        expect(resource.type).toEqual(type);

        expect(()=> resource.setType(null)).toThrowError("Type is required");

    });


    it("Allows to manage scopes", function(){

        let scopes = ["create", "update", "participate"];

        expect(resource.scopes.length).toEqual(0);

        resource.setScopes(scopes);

        expect(resource.scopes).toEqual(scopes);

        resource.addScope("delete");

        expect(resource.scopes.includes("delete")).toEqual(true);

        resource.setScopes(null);

        expect(resource.scopes.length).toEqual(0);

        expect(()=> resource.addScope()).toThrowError("Scope name is required");

    });


    it("Allows to manage resource owner", function(){
        let owner = "myUserId";

        expect(resource.owner).toEqual(null);

        resource.setOwner(owner);

        expect(resource.owner).toEqual(owner);

        expect(()=> resource.setOwner(null)).toThrowError("Owner is required");

    });

    it("Allows to manage resource id", function(){
        let id = "resourceID";

        expect(resource.id).toEqual(null);

        resource.setId(id);

        expect(resource.id).toEqual(id);

        expect(()=> resource.setId(null)).toThrowError("Id is required");

    });


    it("Has chainable setters", function(){

        expect(resource.setName("name")).toEqual(resource);

        expect(resource.setUri("uri")).toEqual(resource);

        expect(resource.setType("type")).toEqual(resource);

        expect(resource.setScopes([])).toEqual(resource);

        expect(resource.addScope("delete")).toEqual(resource);

        expect(resource.setOwner("owner")).toEqual(resource);

        expect(resource.setId("id")).toEqual(resource);

        expect(resource.setIconUri("example")).toEqual(resource);

    });


});