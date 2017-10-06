class ProtectedResource {

    constructor(client){

        this._client = client;

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