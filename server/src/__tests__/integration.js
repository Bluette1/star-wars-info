const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');
const { constructTestServer } = require('./__utils');

// the mocked REST API data
const { mockPersonResponse, mockPerson } = require('../datasources/__tests__/person');

const PEOPLE_LIST_QUERY = gql`
  query people($page: Int) {
    people(page: $page) {
      name
      height
      gender
      homeworld
    }
  }
`;

const GET_PERSON_BY_NAME = gql`
  query person($name: String) {
    person(name: $name) {
      name
      height
      gender
      homeworld
    }
  }
`;

const GET_PERSON_BY_ID = gql`
  query person($id: Int) {
    person(id: $id) {
      name
      height
      gender
      homeworld
    }
  }
`;

describe('Queries', () => {
  it('fetches list of people', async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    // This function returns the server instance as well as our dataSource
    // instances, so we can overwrite the underlying fetchers
    const { server, personAPI } = constructTestServer({
      context: () => ({ userId: 1 }),
    });

    // mock the datasources' underlying fetch methods, whether that's a REST
    // lookup in the RESTDataSource or the store query in the Sequelize datasource
    personAPI.get = jest.fn(() => ({ results: [mockPersonResponse] }));

    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query } = createTestClient(server);
    const res = await query({ query: PEOPLE_LIST_QUERY });
    expect(res).toMatchSnapshot();
    expect(res.data.people).toEqual([mockPerson]);
  });

  it('fetches single person by id', async () => {
    const { server, personAPI } = constructTestServer({
      context: () => ({ userId: 1 }),
    });

    personAPI.get = jest.fn(() => mockPersonResponse);

    const { query } = createTestClient(server);
    const res = await query({ query: GET_PERSON_BY_ID, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
    expect(res.data.person).toEqual(mockPerson);
  });

  it('fetches single person by name', async () => {
    const { server, personAPI } = constructTestServer({
      context: () => ({ userId: 1 }),
    });

    personAPI.get = jest.fn(() => ({ results: [mockPersonResponse] }));

    const { query } = createTestClient(server);
    const res = await query({
      query: GET_PERSON_BY_NAME,
      variables: { name: 'Luke Skywalker' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data.person).toEqual(mockPerson);
  });
});
