# Keycloak AuthZ JS
Keycloak Authorization Client API  for Javascript applications

## Installation

```
npm install nevermind-corp/keycloak-authz --save
```

## Usage

```javascript

const { UMAResource, AuthzClient } = require('keycloak-authz');



let client = new AuthzClient({
  url: 'localhost:8080',
  realm: 'master',
  clientId: 'myAwesomeApiService',
  credentials: {
      secret: "clientSecret"
  },
  publicClient: false
});

client.authenticate().then(()=>{
    
    /* Create protected resource  */
    let resource = new UMAResource("myAwesomeProtectedResource");
        .setOwner("userId")
        .addScope("api:create")
        .addScope("api:delete")
        .setIconUri("https://img.com/resource.png")
        .setType("photoz")
        .setUri("/photoz/item/133");  
         
    client.resource().create(resource).then(created =>{
        console.info("Resource is created: ", resource.id);
        console.info(resource.equal(created)) // true
    });
    
    
    /* Update protected resource */
    resource
        .setName("New Name")
        .addScope("app:events:participate")
        .setOwner("OtherUserId")
        .setType("albumz");
    
    client.resource().update(resource).then(updated =>{  
        console.log("Resource is updated", updated);
        console.info(resource.equal(updated)) // true
        console.info(resource.hasScope("app:events:participate")) // true
    });
    
    
    /* Find Resource by Id */
    client.resource().findById(resource.id).then(result =>{
        console.info("Search result is:" ,result);
        console.info(result.equal(resource)) // true
    });
    
    
    /* Find resources by filter */
    client.resource().findByFilter("type=albumz").then(resources =>{
        console.info(`Found ${resources.length} resources with filter: type=albumz`);
    });
    
    /* Delete resource by id */
    client.resource().deleteById("someId").then(response =>{
        console.info(`Resource with id SomeId is deleted`, response);
    });
    
    /* find all resource ids */
    client.resource().findAll(false).then(resources =>{
        console.info(resources.length);
    });
    
    /* Fetch all resources with their descriptions */
    client.resource().findAll(true).then(resources =>{
        console.info("All resources with info", resources);
    });
});



```

