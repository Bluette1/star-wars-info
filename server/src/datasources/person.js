const { RESTDataSource } = require('apollo-datasource-rest');

const personReducer = person => {
  this.person = {
    name: person.name,
    height: person.height,
    gender: person.gender,
    homeworld: person.homeworld,
  };
  return this.person;
};

class PersonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/';
  }

  async getAllPeople(page = 1) {
    const response = await this.get(`people/?page=${page}`);
    return Array.isArray(response)
      ? response.map(person => personReducer(person))
      : [];
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
