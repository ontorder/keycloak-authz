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

// Create protected resource
client.authenticate().then(()=>{
    
    let resource = new UMAResource("myAwesomeProtectedResource");
        .setOwner("userId")
        .addScope("api:create")
        .addScope("api:delete")
        .setIconUri("https://img.com/resource.png")
        .setType("photoz")
        .setUri("/photoz/item/133");
        
        
    return client.resource().create(resource);
    
}).then((createdResource)=>{
    
   console.log("Resource created: ", createdResource); 
   
});
```

