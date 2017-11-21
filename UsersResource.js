const HttpResource = require('./HttpResource');

class UsersResource extends HttpResource {

    constructor(authzClient){

        super(authzClient, true);
        this._client = authzClient;

    }

    async find( options = {}, realm = this._client.realm ){

        if(options.userId) return await this.findById(options.userId, realm);

        const {body} = await this.get(`/users`, options, realm );

        return body;
    }

    async findById( userId, realm = this._client.realm ){

        const {body} = await this.get(`/users/${userId}`, realm);

        return body;

    }

    async create( user, realm = this._client.realm ){

        const { response } = await this.post('/users', user, realm);

        const uid = response.headers.location.replace(/.*\/(.*)$/, '$1');

        return await this.findById(uid, realm);

    }


    async update( user, realm = this._client.realm ){

        const { body } = await this.put(`/users/${user.id}`, user, realm);

        return body;

    }



}

module.exports = UsersResource;