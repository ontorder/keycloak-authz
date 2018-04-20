const HttpResource = require('./HttpResource');

class UsersResource extends HttpResource {

    constructor(authzClient){

        super(authzClient, true);


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

    async getRoleMappings(userId, realm = this._client.realm ){

        const { body } = await this.get(`/users/${userId}/role-mappings`, {}, realm );

        return body;
    }

    async addRealmRoles( userId, roles,  realm = this._client.realm ) {

        const { body } = await this.post(`/users/${userId}/role-mappings/realm`, roles, realm );

        return body;
    }

    async removeRealmRoles( userId, roles,  realm = this._client.realm ) {

        const { body } = await this.delete(`/users/${userId}/role-mappings/realm`, roles, realm );

        return body;
    }

    async getInviteToken ( { userId, clientId, redirectUri, lifespan = 7200 } , realm = this._client.realm  ){

        const { body } = await this.get(`/users/${userId}/invite_token`, {
            client_id: clientId,
            redirect_uri: redirectUri,
            lifespan
        }, realm );


        return body;

    }

    async deleteIdentityProvider ( userId, providerName, realm = this._client.realm  ){

        const { body } = await this.delete(`/users/${userId}/federated-identity/${providerName}`, {}, realm );

        return body;

    }


    async resetPassword (userId, newCredentials = {}, realm = this._client.realm){

        const { body } = await this.put(`/users/${userId}/reset-password`, newCredentials, realm );

        return body;

    }


}

module.exports = UsersResource;