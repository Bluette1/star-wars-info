const { RESTDataSource } = require('apollo-datasource-rest');

const getPersonId = url => {
  const splitArray = url.split('/');
  return parseInt(splitArray[splitArray.length - 2], 10);
};
const personReducer = person => ({
  name: person.name,
  height: person.height,
  gender: person.gender,
  homeworld: person.homeworld,
});

const personWithIdReducer = person => ({
  id: getPersonId(person.url),
  name: person.name,
  height: person.height,
  gender: person.gender,
  homeworld: person.homeworld,
});

const personDetailsReducer = person => ({
  name: person.name,
  height: person.height,
  gender: person.gender,
  homeworld: person.homeworld,
  eyeColor: person.eye_color,
  hairColor: person.hair_color,
  skinColor: person.skin_color,
  films: person.films,
  species: person.species,
  vehicles: person.vehicles,
  starships: person.starships,
  url: person.url,
});

class PersonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
    this.personReducer = personReducer;
    this.personWithIdReducer = personWithIdReducer;
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
    const response = await this.get(`people/?search=${params}`);
    return personReducer(response.results[0]);
  }

  async getPersonByNameWithId({ name }) {
    const params = encodeURIComponent(name);
    const response = await this.get(`people/?search=${params}`);
    return personWithIdReducer(response.results[0]);
  }

  async getPersonDetailsByName({ name }) {
    const params = encodeURIComponent(name);
    const response = await this.get(`people/?search=${params}`);
    return personDetailsReducer(response.results[0]);
  }

  async getPersonDetailsById({ id }) {
    const response = await this.get(`people/${id}`);
    return personDetailsReducer(response);
  }
}

module.exports = PersonAPI;
