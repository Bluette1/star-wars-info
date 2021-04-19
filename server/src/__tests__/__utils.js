const { toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  Person,
  User,
  store,
} = require('..');

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const user = new User({ store });
  const person = new Person();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ user, person }),
    context,
  });

  return { server, user, person };
};

module.exports.constructTestServer = constructTestServer;
