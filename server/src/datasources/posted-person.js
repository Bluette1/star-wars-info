const { DataSource } = require('apollo-datasource');

class PostedPersonAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async postedBy({ id }) {
    return this.store.person.findUnique({ where: { id } }).postedBy();
  }

  async postedById({ id }) {
    return this.store.person.findUnique({ where: { id } }).postedById();
  }

  async addPerson({ personId: peopleId, name: personName }) {
    const { userId } = this.context;
    if (!userId) return {};
    const personPosted = await this.store.person.create({
      data: {
        personId: peopleId,
        name: personName,
        postedBy: { connect: { id: userId } },
      },
    });
    const {
      id, personId, name, postedById,
    } = personPosted;
    return {
      id,
      personId,
      name,
      postedById,
    };
  }

  async removePerson({ personId: peopleId, name: personName }) {
    const { userId } = this.context;
    const deletePerson = this.store.person.delete({
      where: { personId: peopleId, name: personName, postedById: userId },
    });

    const {
      id, personId, name, postedById,
    } = deletePerson;

    return {
      id,
      personId,
      name,
      postedById,
    };
  }
}

module.exports = PostedPersonAPI;
