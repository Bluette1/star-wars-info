const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAPI = require('./apis/user-api');
const { APP_SECRET } = require('../utils');

const bcryptHash = async passwd => {
  const password = await bcrypt.hash(passwd, 10);
  return password;
};

const comparePasswords = async (passwordArg, usr) => {
  const valid = await bcrypt.compare(passwordArg, usr.password);
  return valid;
};
const retrieveToken = usr => {
  const user = usr;

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  user.token = token;
  return user;
};

class User extends UserAPI {
  constructor({ store }) {
    super({ store });
    this.retrieveToken = retrieveToken;
    this.comparePasswords = comparePasswords;
    this.bcryptHash = bcryptHash;
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
    const valid = this.comparePasswords(passwordArg, user);
    if (!valid) {
      return null;
    }
    return this.retrieveToken(user);
  }

  async create({ email: emailArg, password: passwordArg, name: nameArg } = {}) {
    const password = await this.bcryptHash(passwordArg);
    const user = await this.store.user.create({
      data: { email: emailArg, password, name: nameArg },
    });
    return this.retrieveToken(user);
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
