/***
 * Allows to manage policies, permissions via 'admin' namespace
 * @see https://github.com/keycloak/keycloak/blob/master/themes/src/main/resources/theme/base/admin/resources/js/authz/authz-services.js
 */

class AdminResource {

    constructor(authzClient){

        this._client = authzClient;

    }


    policy(){
        //TODO
    }

    permission(){
        //TODO
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