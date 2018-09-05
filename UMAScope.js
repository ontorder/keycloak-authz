class UMAScope {
  constructor({ name, id = null, icon_uri = null }) {
    this.name = name;
    this.id = id;
    this.icon_uri = icon_uri;
  }

  equal(object) {
    return this.name === object.name;
  }

  serialize() {
    let obj = {
      name: this.name
    };
    if (this.id) obj.id = this.id;
    if (this.icon_uri) obj.icon_uri = this.icon_uri;
    return obj;
  }
}

module.exports = UMAScope;
