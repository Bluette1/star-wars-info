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
    post(name: String!, personId: String!): Person!
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }


  type User {
    id: ID!
    name: String!
    email: String!
    people: [Person]!
    token: String
  }
`;

module.exports = typeDefs;
