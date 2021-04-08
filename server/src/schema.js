const { gql } = require('apollo-server');
const typeDefs = gql`
  type Person {
    name: String!
    height: Float!
    gender: String!
    homeworld: String!
  }

  type User {
    id: ID!
    email: String!
    favourites: [Person]!
    token: String
  }

  type Query {
    people(page: Int): [Person]
    person(name: String, id: Int): Person
    me: User
  }
`;

module.exports = typeDefs;
