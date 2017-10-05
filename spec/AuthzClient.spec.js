const AuthzClient = require('../AuthzClient');

describe("AuthzClient", function(){

    it("Validates required configuration parameters", function(){

        expect(() => new AuthzClient()).toThrowError(Error);

        expect(() => new AuthzClient({url: "test"})).toThrowError(Error);

        expect(() => new AuthzClient({url: "test", clientId: "test", realm: "master"})).not.toThrowError(Error);

    });
});