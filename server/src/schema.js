const { gql } = require('apollo-server');

const typeDefs = gql`
  type Person {
    name: String!
    height: String!
    gender: String!
    homeworld: String!
  }

  type Query {
    people(page: Int): [Person]
    person(name: String, id: Int): Person
    personDetails(name: String, id: Int): PersonDetails
    me: User
    myPeople: [PostPersonResponse]
  }

  type Mutation {
    postPerson(name: String!, personId: Int!): PostPersonResponse!
    postPersonWithName(name: String!): PostPersonResponse!
    deletePersonWithName(name: String!): PostPersonResponse!
    signup(email: String!, password: String!, name: String!): User
    login(email: String!, password: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    people: [PostedPerson]!
    token: String
  }

  type PostPersonResponse {
    id: ID!
    personId: Int!
    name: String
    postedById: Int!
  }

type PostedPerson {
    id: ID!
    personId: Int!
    name: String!
    postedBy: User
    postedById: Int!
}
  
  type PersonWithId {
    name: String!
    height: String!
    gender: String!
    homeworld: String!
    id: Int!
  }

  type PersonDetails {
    name: String!
    height: String!
    gender: String!
    homeworld: String!
    eyeColor: String!
    hairColor: String!
    skinColor: String!
    films:[String!]
    species: [String!]
    vehicles: [String!]
    starships: [String!]
    url: String!
  }
`;

module.exports = typeDefs;
