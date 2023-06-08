import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
} from '@apollo/client';
import Routes from './routes';
import { cache } from './cache';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'https://starwars-api.fly.dev/graphql',
  // uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Star Wars [web]',
    'client-version': '1.0.0',
  },
  typeDefs,
  resolvers: {},
});

function Content() {
  return <Routes />;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <Content />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
