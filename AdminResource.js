/***
 * Allows to manage policies, permissions via 'admin' namespace
 * @see https://github.com/keycloak/keycloak/blob/master/themes/src/main/resources/theme/base/admin/resources/js/authz/authz-services.js
 */

const PolicyResource = require('./PolicyResource'),
      PermissionResource = require('./PermissionResource');

class AdminResource {

    constructor(authzClient){
        this._policyResource = new PolicyResource(authzClient);
        this._permissionResource = new PermissionResource(authzClient);
    }



    policy(){
        return this._policyResource;
    }

    permission(){
        return this._permissionResource;
    }


    scope(){
        //TODO
    }

    resource(){
        //TODO
    }

    user(){
        //TODO
    }

    client(){
        //TODO
    }


}

module.exports = AdminResource;