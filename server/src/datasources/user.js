const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAPI = require('./apis/user-api');
const { APP_SECRET } = require('../utils');

class User extends UserAPI {
  constructor({ store }) {
    super({ store });
  }

  async find({ email: emailArg, password: passwordArg } = {}) {
    const loggedIn = !!(this.context && this.context.userId);
    let user;
    if (loggedIn) {
      const { userId } = this.context;
      user = await this.store.user.findUnique({ where: { id: userId } });
      return user;
    }
    user = await this.store.user.findUnique({ where: { email: emailArg } });

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

  async create({
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

  async getPersons() {
    const { userId } = this.context;
    const user = await this.store.user.findUnique({
      where: { id: userId },
      include: { people: true },
    });

    return user.people;
  }
}

module.exports = User;
