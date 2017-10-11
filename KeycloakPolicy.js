class KeycloakPolicy {

   constructor({type, id, name, description, logic = KeycloakPolicy.logic.POSITIVE, config = {}} = {}){
        this._id = id;
        this._name = name;
        this._description = description;
        this._logic = logic;
        this._type = type;
        this._config = config;
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
       if(!KeycloakPolicy.logic[value]) throw new Error("Logic is incorrect");
       this._logic = value;
       return this;
   }

   get type(){
       return this._type;
   }

   setType(value){
       if(!value) throw new Error("Type is required");
       if(!Object.values(KeycloakPolicy.type).includes(value)) throw new Error("Type is incorrect");
       this._type = value;
       return this;
   }

   static get type(){
      return  {
          ROLE_BASED: 'role',
          RESOURCE_BASED: 'resource',
          SCOPE_BASED: 'scope',
          JS_BASED: 'js',
          CLIENT_BASED: 'client',
          RULE_BASED: 'rules',
          TIME_BASED: 'time',
          USER_BASED: 'user',
          AGGREGATED: 'aggregate',
          GROUP_BASED: 'group'
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
       return object;
   }

}

module.exports = KeycloakPolicy;