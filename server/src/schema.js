const { gql } = require('apollo-server');

const typeDefs = gql`
  type Person {
    name: String!
    height: Float!
    gender: String!
    homeworld: String!
  }

  type Query {
    people(page: Int): [Person]
    person(name: String, id: Int): Person
    me: User
  }

  type Mutation {
    postPerson(name: String!, personId: Int!): PostPersonResponse!
    signup(email: String!, password: String!, name: String!): User
    login(email: String!, password: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    people: [Person]!
    token: String
  }

  type PostPersonResponse {
    id: ID!
    personId: Int!
    name: String!
    postedById: ID!
  }
`;

module.exports = typeDefs;
