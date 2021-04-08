const { RESTDataSource } = require('apollo-datasource-rest');

const personReducer = person => ({
  name: person.name,
  height: person.height,
  gender: person.gender,
  homeworld: person.homeworld,
});

class PersonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getAllPeople({ page }) {
    const response = await this.get(`people/?page=${page}`);
    return Array.isArray(response.results)
      ? response.results.map(person => personReducer(person))
      : [];
  }

  async getPersonById({ id }) {
    const response = await this.get(`people/${id}`);
    return personReducer(response);
  }

  async getPersonByName({ name }) {
    const params = encodeURIComponent(name);
    console.log(params);
    const response = await this.get(`people/?search=${params}`);
    return personReducer(response.results[0]);
  }
}

module.exports = PersonAPI;
