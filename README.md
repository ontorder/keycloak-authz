# Keycloak AuthZ JS

Keycloak Authorization Client API for Javascript applications

## Installation

```
npm install nevermind-corp/keycloak-authz --save
```

## Usage

```javascript
const { UMAResource, AuthzClient  } = require('keycloak-authz');

(async ()=>{

    const client = new AuthzClient({
        url: 'localhost:8080',
        realm: 'master',
        clientId: 'myAwesomeApiService',
        credentials: {
            secret: "clientSecret"
        },
        publicClient: false
    });

    const resource = new UMAResource();
        .setName('MyAwesomeResource')
        .setOwner("userId")
        .addScope("api:create")
        .addScope("api:delete")
        .setIconUri("https://img.com/resource.png")
        .setType("photoz")
        .setUri("/photoz/item/133");

   await  client.authenticate();
   
   await client.resource.create(resource);

   resource
        .setName("New Name")
        .addScope("app:events:participate")
        .setOwner("OtherUserId")
        .setType("albumz");
    
    await client.resource.update(resource);

    const resourceById = await client.resource.findById('ID');

    const resourceByFilter = client.resource.findByFilter("type=albumz");

})();

```

## Admin cli

### NOTE: client should have realm management rights to connect as admin

```javascript
(async () => {
  const client = new AuthzClient({
    url: 'localhost:8080',
    realm: 'master',
    clientId: 'myAwesomeApiService',
    credentials: {
      secret: 'clientSecret'
    }
  });

  await client.authenticate();

  /** get user by id **/
  const userRepresentation = await client.admin.users.find({ userId: tokenSub });
})();
```
