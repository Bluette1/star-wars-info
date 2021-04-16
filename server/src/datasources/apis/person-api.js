const { RESTDataSource } = require('apollo-datasource-rest');

class PersonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }
}

module.exports = PersonAPI;
