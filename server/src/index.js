require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { getUserId } = require('./utils');
const PersonAPI = require('./datasources/person');
const UserAPI = require('./datasources/user');
const PostedPersonAPI = require('./datasources/posted-person');

const store = new PrismaClient();

const context = async ({ req }) => ({
  ...req,
  userId: req && req.headers.authorization ? getUserId(req) : null,
});

const dataSources = () => ({
  personAPI: new PersonAPI(),
  userAPI: new UserAPI({ store }),
  postedPersonApi: new PostedPersonAPI({ store }),
});

// async function startApolloServer() {
const app = express();
const server = new ApolloServer({
  context,
  typeDefs,
  resolvers,
  dataSources,
});
server.applyMiddleware({ app });

app.use(express.static('public'));

app.use((_req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  res.end();
});

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  PersonAPI,
  UserAPI,
  store,
  server,
  app,
};
