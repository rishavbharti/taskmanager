class Database {
  constructor() {}

  model(name, schema) {
    this[name] = {
      _schema: schema,
      store: {},
    };

    return this;
  }

  validate(name, data) {
    for (const [field, properties] of Object.entries(this[name]['_schema'])) {
      for (const [property, value] of Object.entries(properties)) {
        switch (property) {
          case 'required': {
            if (!data.hasOwnProperty(field)) {
              throw new Error(`Missing required field ${field}.`);
            }
            break;
          }

          case 'type': {
            if (
              data.hasOwnProperty(field) &&
              typeof data[field] !== value.toLowerCase()
            ) {
              throw new Error(`${field} should be of type ${value}.`);
            }
            break;
          }

          case 'minLength': {
            if (data.hasOwnProperty(field) && data[field].length < value) {
              throw new Error(
                `${field} should have a minimum length of ${value}.`
              );
            }
            break;
          }

          case 'maxLength': {
            if (data.hasOwnProperty(field) && data[field].length > value) {
              throw new Error(
                `${field} can have a maximum length of ${value}.`
              );
            }
            break;
          }

          case 'trim': {
            if (typeof data[field] === 'string') {
              data[field] = data[field].trim();
            }
            break;
          }

          case 'default': {
            data[field] = value;
            break;
          }

          case 'enum': {
            if (data.hasOwnProperty(field) && !value.includes(data[field])) {
              throw new Error(
                `${field} is an Enum. Should be one of ${value}.`
              );
            }
            break;
          }

          default:
            break;
        }
      }
    }

    data.id = Date.now().toString();
    data.createdAt = new Date();
    data.updatedAt = new Date();
  }

  write(data) {
    try {
      const schemaName = Object.keys(this)[0];

      this.validate(schemaName, data);
      this[schemaName].store[data.id] = data;
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  find(filters) {
    const schemaName = Object.keys(this)[0];

    if (!filters) return Object.values(this[schemaName].store);
  }

  findById(id) {
    const schemaName = Object.keys(this)[0];

    if (!id) throw new Error('ID is required');

    return this[schemaName].store[id];
  }

  findByIdAndUpdate(id, data) {
    const schemaName = Object.keys(this)[0];

    if (!id) throw new Error('ID is required');
    if (!this[schemaName].store.hasOwnProperty(id))
      throw new Error("Couldn't find a task with the given id");

    this[schemaName].store[id] = { ...this[schemaName].store[id], ...data };

    return this[schemaName].store[id];
  }
}

module.exports = Database;
