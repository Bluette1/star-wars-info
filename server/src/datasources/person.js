const PersonAPI = require('./apis/person-api');

const getId = url => {
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
  id: getId(person.url),
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

class Person extends PersonAPI {
  constructor() {
    super();
    this.personReducer = personReducer;
    this.personWithIdReducer = personWithIdReducer;
    this.personDetailsReducer = personDetailsReducer;
  }

  async getAll({ page }) {
    const response = await this.get(`people/?page=${page}`);
    return Array.isArray(response.results)
      ? response.results.map(person => personReducer(person))
      : [];
  }

  async getById({ id }) {
    const response = await this.get(`people/${id}`);
    return personReducer(response);
  }

  async getByName({ name }) {
    const params = encodeURIComponent(name);
    const response = await this.get(`people/?search=${params}`);
    return personReducer(response.results[0]);
  }

  async getByNameWithId({ name }) {
    const params = encodeURIComponent(name);
    const response = await this.get(`people/?search=${params}`);
    return personWithIdReducer(response.results[0]);
  }

  async getDetailsByName({ name }) {
    const params = encodeURIComponent(name);
    const response = await this.get(`people/?search=${params}`);
    return personDetailsReducer(response.results[0]);
  }

  async getDetailsById({ id }) {
    const response = await this.get(`people/${id}`);
    return personDetailsReducer(response);
  }
}

module.exports = Person;
