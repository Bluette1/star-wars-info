require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { getUserId } = require('./utils');

const store = new PrismaClient();

const PersonAPI = require('./datasources/person');
const UserAPI = require('./datasources/user');

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    context: async ({ req }) => ({
      ...req,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    }),
    typeDefs,
    resolvers,
    dataSources: () => ({
      personAPI: new PersonAPI(),
      userAPI: new UserAPI({ store }),
    }),
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use(express.static('public'));

  app.use((_req, res) => {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    res.end();
  });

  const PORT = process.env.PORT || 4000;

  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();
