const { RESTDataSource } = require('apollo-datasource-rest');

class PersonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/';
  }

  async getAllPeople(page = 1) {
    const response = await this.get(`people/?page=${page}`);
    return Array.isArray(response)
      ? response.map((person) => this.personReducer(person))
      : [];
  }

  personReducer(person) {
    return {
      name: person.name,
      height: person.height,
      gender: person.gender,
      homeworld: person.homeworld,
    };
  }

  async getPersonById({ id }) {
    const response = await this.get('people', { id });
    return this.personReducer(response[0]);
  }

  async getPersonByName({ name }) {
    const response = await this.get(`people/?search=${name}`);
    return this.personReducer(response[0]);
  }
}

module.exports = PersonAPI;
