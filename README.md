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
    
    let resource = new UMAResource("myAwesomeProtectedResource");
        .setOwner("userId")
        .addScope("api:create")
        .addScope("api:delete")
        .setIconUri("https://img.com/resource.png")
        .setType("photoz")
        .setUri("/photoz/item/133");  
        
    // Create protected resource   
    client.resource().create(resource).then(created =>{
        console.info("Resource created: ", resource.id);
        console.info(resource.equal(created)) // true
    });
    
    
    resource
        .setName("New Name")
        .addScope("app:events:participate")
        .setOwner("OtherUserId")
        .setType("albumz");
    
    // Update protected resource  
    client.resource().update(resource).then(updateResource =>{  
        console.log("Resource is updated", updateResource);
        console.info(resource.equal(updateResource)) // true
    });
    
    
    //Find Resource by Id
    client.resource().findById(resource.id).then(result =>{
        console.info("Search result is:" ,result);
        console.info(result.equal(resource)) // true
    });
    
});



```

