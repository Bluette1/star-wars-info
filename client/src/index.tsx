import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';
import Header from './Header';
import Routes from './Routes';
// import PublicRoutes from './components/PublicRoutes';
import LoginForm from './components/login-form';
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
  uri: 'http://localhost:4000/graphql',
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
  console.log(data);
  return data.isLoggedIn ? <Routes /> : <LoginForm />;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <Header />
        <IsLoggedIn />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
