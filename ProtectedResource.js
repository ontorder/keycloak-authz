class ProtectedResource {

    constructor(authzClient){

        this._client = authzClient;

    }



    create(resource){

        return true;
    }


    update(resource){

        return true;
    }

    findById(id){

        return true;

    }

    findByFilter(filter){

        return true;
    }

    findAll(){

        return true;
    }

    delete(id){

        return true;

    }

}

module.exports = ProtectedResource;