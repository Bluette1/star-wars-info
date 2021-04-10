const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findUser({ email: emailArg, password: passwordArg } = {}) {
    const loggedIn = !!(this.context && this.context.userId);
    let user;
    if (loggedIn) {
      const { userId } = this.context;
      user = await this.store.user.findUnique({ where: { id: userId } });
      return user;
    }
    user = await this.store.user.findUnique({ where: { email: emailArg } });
    console.log('Here!!!', user);

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(passwordArg, user.password);
    if (!valid) {
      return null;
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    user.token = token;
    return user;
  }

  async createUser({
    email: emailArg,
    password: passwordArg,
    name: nameArg,
  } = {}) {
    const password = await bcrypt.hash(passwordArg, 10);

    const user = await this.store.user.create({
      data: { email: emailArg, password, name: nameArg },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    user.token = token;

    return user;
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

  async removePerson({ personId }) {
    const { userId } = this.context;
    return this.store.person.delete({
      where: { personId, postedById: userId },
    });
  }

  async getPersonsByUser() {
    const { userId } = this.context;
    const user = await this.store.user.findUnique({
      where: { id: userId },
      include: { people: true },
    });

    return user.people;
  }
}

module.exports = UserAPI;
