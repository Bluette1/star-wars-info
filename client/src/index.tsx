import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';
import './css/index.css';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';
import Routes from './routes';
import PublicRoutes from './public-routes';
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
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Star Wars [web]',
    'client-version': '1.0.0',
  },
  typeDefs,
  resolvers: {},
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  const history = useHistory();
  let content;
  if (data.isLoggedIn) {
    history.push('/');
    content = <Routes />;
  } else {
    history.push('/login');
    content = <PublicRoutes />;
  }
  return content;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <IsLoggedIn />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
