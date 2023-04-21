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
            if (!data.hasOwnProperty(field)) data[field] = value;
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

  constructFilterString(filters) {
    let filtersArray = [];

    for (const [field, properties] of Object.entries(filters)) {
      if (typeof properties === 'object') {
        for (const [property, value] of Object.entries(properties)) {
          switch (property) {
            case '$in': {
              filtersArray.push(`[${value}].includes(data.${field})`);
              break;
            }

            case '$lt': {
              filtersArray.push(`data.${field} < '${value}'`);
              break;
            }

            case '$gt': {
              filtersArray.push(`data.${field} > '${value}'`);
              break;
            }

            default:
              break;
          }
        }
      } else {
        filtersArray.push(`data.${field}.toString() === '${properties}'`);
      }
    }

    return filtersArray.join('&&');
  }

  find(filters) {
    const schemaName = Object.keys(this)[0];
    const filtersLength = Object.entries(filters).length;

    if (!filters || filtersLength === 0)
      return Object.values(this[schemaName].store);

    const filtersString = this.constructFilterString(filters);

    const dataInStore = Object.values(this[schemaName].store);
    return dataInStore.filter((data) => {
      try {
        return eval(filtersString);
      } catch (error) {
        throw new Error(error);
      }
    });
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

    const validatedData = {
      ...this[schemaName].store[id],
      ...data,
    };

    this.validate(schemaName, validatedData);

    this[schemaName].store[id] = validatedData;

    return this[schemaName].store[id];
  }

  deleteOne(filters) {
    const schemaName = Object.keys(this)[0];

    if (!filters) throw new Error('No filters present to identify data.');

    if (filters?.id) {
      if (!this[schemaName].store.hasOwnProperty(filters.id))
        throw new Error("Couldn't find a task with the given id");

      delete this[schemaName].store[filters.id];
      return true;
    }
  }
}

module.exports = Database;
