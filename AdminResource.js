const UsersResource = require('./UsersResource');

class AdminResource {

    constructor(authzClient){
        this._users = new UsersResource(authzClient);
    }

    /**
     * @returns {UsersResource}
     */
    get users(){
        return this._users;
    }

}

module.exports = AdminResource;