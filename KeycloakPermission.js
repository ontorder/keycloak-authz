class KeycloakPermission {

   constructor({   type,
                   id,
                   name,
                   description,
                   resourceType,
                   logic = KeycloakPermission.logic.POSITIVE,
                   config = {},
                   policies = [],
                   resources = [],
                   scopes = [] } = {}){

        this._id = id;
        this._name = name;
        this._description = description;
        this._logic = logic;
        this._type = type;
        this._policies = policies;
        this._resources = resources;
        this._resourceType = resourceType;
        this._scopes = scopes;
        this._config = config;
   }


   get policies(){
       return this._policies;
   }

   setPolicies(value){
       if(!value || !value.length) throw new Error("Policies is required");
       this._policies = value;
       return this;
   }

   addPolicy(id){
       if(id){
           this._policies.push(id);
       }
       return this;
   }

   get resources(){
       return this._resources;
   }


   addResource(id){
       if(id){
           this._resources.push(id);
       }
       return this;
   }

   setResources(value){
       if(!value || !value.length) throw new Error("Resources is required");
       this._resources = value;
       return this;
   }

   get scopes(){
       return this._scopes;
   }

   addScope(scopeId){
       if(scopeId) this._scopes.push(scopeId);
       return this;
   }

   setScopes(value){
       if(!value || !value.length) throw new Error("Scopes is required");
       this._scopes = value;
       return this;
   }


   get resourceType(){
       return this._resourceType;
   }

   setResourceType(type){
       if(!type) throw new Error("ResourceType is required");
       this._resourceType = type;
       return this;
   }

   get id(){
       return this._id;
   }

   setId(value){
       if(!value) throw new Error("Id is required");
       this._id = value;
       return this;
   }

   get name(){
       return this._name;
   }

   setName(value){
       if(!value) throw new Error("Name is required");
       this._name = value;
       return this;
   }

   get description(){
       return this._description;
   }

   setDescription(value){
       if(!value) throw new Error("Description is required");
       this._description = value;
       return this;
   }

   get logic(){
       return this._logic;
   }

   setLogic(value){
       if(!value) throw new Error("Logic is required");
       if(!KeycloakPermission.logic[value]) throw new Error("Logic is incorrect");
       this._logic = value;
       return this;
   }

   get type(){
       return this._type;
   }

   setType(value){
       if(!value) throw new Error("Type is required");
       if(!Object.values(KeycloakPermission.type).includes(value)) throw new Error("Type is incorrect");
       this._type = value;
       return this;
   }

   static get type(){
      return  {
          RESOURCE_BASED: 'resource',
          SCOPE_BASED: 'scope'
      };
   }

   static get logic(){
       return {
           POSITIVE: "POSITIVE",
           NEGATIVE: "NEGATIVE"
       }
   }

   get config(){
       return this._config;
   }

   setConfig(value){
       this._config = value;
       return this;
   }

   serialize(){
       let object = {};
       if(this.id) object.id = this._id;
       if(this.name) object.name = this._name;
       if(this.description) object.description = this._description;
       if(this.logic) object.logic = this._logic;
       if(this.type) object.type = this._type;
       if(typeof this._config === "object"){
           Object.assign(object, this._config);
       }

       if(this.scopes) object.scopes = this._scopes;
       if(this.resources) object.resources = this._resources;
       if(this.policies) object.policies = this._policies;
       if(this.resourceType) object.resourceType = this._resourceType;
       return object;
   }

}

module.exports = KeycloakPermission;