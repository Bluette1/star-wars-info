require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { getUserId } = require('./utils');
const Person = require('./datasources/person');
const User = require('./datasources/user');
const Favourite = require('./datasources/favourite');

const store = new PrismaClient();

const context = async ({ req }) => ({
  ...req,
  userId: req && req.headers.authorization ? getUserId(req) : null,
});

const dataSources = () => ({
  person: new Person(),
  user: new User({ store }),
  favourite: new Favourite({ store }),
});

const app = express();

// Allow cross-origin
app.use(cors());
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
  Person,
  User,
  store,
  server,
  app,
};
