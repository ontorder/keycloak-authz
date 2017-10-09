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
  url: 'localhost:8080/auth',
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
        resource.setOwner("userId");
        resource.addScope("api:create");
        resource.addScope("api:delete");
        resource.setIcon("https://img.com/resource.png"); 
        
    return client.resource().create(resource);
    
}).then((createdResource)=>{
    
   console.log("Resource created: ", createdResource); 
   
});
```

