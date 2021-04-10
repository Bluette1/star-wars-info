const { toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  PersonAPI,
  UserAPI,
  store,
} = require('..');

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new UserAPI({ store });
  const personAPI = new PersonAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI, personAPI }),
    context,
  });

  return { server, userAPI, personAPI };
};

module.exports.constructTestServer = constructTestServer;
