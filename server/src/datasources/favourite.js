const UserAPI = require('./apis/user-api');

class Favourite extends UserAPI {
  constructor({ store }) {
    super({ store });
  }

  async postedBy({ id }) {
    return this.store.person.findUnique({ where: { id } }).postedBy();
  }

  async postedById({ id }) {
    return this.store.person.findUnique({ where: { id } }).postedById();
  }

  async add({ personId: peopleId, name: personName }) {
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

  async remove({ personId: peopleId, name: personName }) {
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

module.exports = Favourite;
