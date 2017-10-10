# Keycloak AuthZ JS
Keycloak Authorization Client API  for Javascript applications

## Installation

```
npm install nevermind-corp/keycloak-authz --save
```

## Usage

```javascript

const { UMAResource, AuthzClient, KeycloakUserPolicy, KeycloakGroupPolicy, KeycloakPermission } = require('keycloak-authz');



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
    
    /** Create protected resource  **/
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
    
    
    /** Update protected resource **/
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
    
    
    /** Find Resource by Id **/
    client.resource().findById(resource.id).then(result =>{
        console.info("Search result is:" ,result);
        console.info(result.equal(resource)) // true
    });
    
    
    /** Find resources by filter **/
    client.resource().findByFilter("type=albumz").then(resources =>{
        console.info(`Found ${resources.length} resources with filter: type=albumz`);
    });
    
    /** Delete resource by id **/
    client.resource().deleteById("someId").then(response =>{
        console.info(`Resource with id SomeId was deleted`, response);
    });
    
    /** Find all resource ids **/
    client.resource().findAll(false).then(resources =>{
        console.info(resources.length);
    });
    
    /** Fetch all resources with their descriptions **/
    client.resource().findAll(true).then(resources =>{
        console.info("All resources with info", resources);
    });
    
    
    /** Retrieve Repuesting Party Token for user **/
    client.entitlement().getAll(user_access_token).then(response =>{
        console.info("Requesting party token is: ", response);
    });
    
    
    /** Introspect RPT **/
    client.entitlement().introspectRequestingPartyToken(requestingPartyToken).then(validToken =>{
        console.info("RPT data: ", validToken.content);
    });
    
    
    /** Validate any type of access token without introspection (offline) **/
    client.entitlement().validateToken(any_token).then(validToken =>{
        console.info("User token is valid", validToken.content);  
    }).catch(error =>{ 
        console.error("User token is expired or invalid");  
    });
    
    
    /** Create User Based policy **/
    const userBasedPolicy = new KeycloakUserPolicy({name: "The participants of meeting #33" });
    
    userBasedPolicy.setDescription("Allows to access only for registered participants")
                   .setLogic(KeycloakUserPolicy.logic.POSITIVE)
                   .addUser("participantId")
                   .addUser("otherUserId");
    
    client.admin().policy().create(userBasedPolicy).then(policy =>{
        console.info("Policy has been created", policy.id);
    });
    
    /** Create group based policy **/
    const groupBasedPolicy = new KeycloakGroupPolicy({name: "The user group"});
          groupBasedPolicy.setDescription("Deny access for user group")
                          .setGroups(["groupId"])
                          .setLogic(KeycloakGroupPolicy.logic.NEGATIVE);
         
   client.admin().policy().create(groupBasedPolicy).then(policy =>{
      console.info("Policy has been created", policy.id);
   });  
   
   
   /** Update some policy **/
   userBasedPolicy.addUser("someNewUser")
   .setName("Renamed")
   .setLogic(KeycloakUserPolicy.logic.NEGATIVE);
  
   client.admin().policy().update(userBasedPolicy).then(policy =>{
         console.info("Policy has been updated", policy.id);
   });
   
   /** Search policy by term **/ 
   client.admin().policy().search({name: "user "}).then(results =>{
       console.info(`Found ${results.length} policies`);
   });
   
   
   /** Create keycloak resource based permission */
   const permission = new KeycloakPermission();
         permission.setType(KeycloakPermission.type.RESOURCE_BASED)
                   .setName("every album resource")
                   .setLogic(KeycloakPermission.logic.POSITIVE)
                   .setDescription("Apply user based policy to all resources with type 'albumz'")
                   .setResourceType('albumz')
                   .addPolicy(userBasedPolicy.id);
   
   client.admin().permission().create(permission).then(created => {
       console.info("Permission has been created: ", created.id);
   });
   
   /** Create keycloak resource based permission for specified resource list */
   const permissionForList = new KeycloakPermission();
         permissionForList.setType(KeycloakPermission.type.RESOURCE_BASED)
                      .setName("some albums")
                      .setLogic(KeycloakPermission.logic.POSITIVE)
                      .setDescription("Apply user based policy to all resources with specified ids")
                      .addPolicy(userBasedPolicy.id)
                      .addResource(resource.id)
                      .addResource(otherResource.id);
         
    client.admin().permission().create(permissionForList).then(created => {
           console.info("Permission has been created: ", created.id);
    });  
    
    /** Create scope based permission **/
    const scopedPermission = new KeycloakPermission();
          scopedPermission.setType(KeycloakPermission.type.SCOPE_BASED)
          .setName("Permission for multiple scopes")
          .setDescription("Apply multiple policies for some scopes with any resource type")
          .addPolicy(userBasedPolicy.id)
          .addPolicy(groupBasedPolicy.id)
          .addScope(resource.scopes[0].id)
          .addScope(resource.scopes[1].id);
          
    client.admin().permission().create(scopedPermission).then(created => {
        console.info("Permission has been created: ", created.id);
    });
    
    
});


```

