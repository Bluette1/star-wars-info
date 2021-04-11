import React from 'react';
import { gql, useMutation } from '@apollo/client';

import LoginForm from './components/login-form';
import { isLoggedInVar } from './cache';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default function Login({ email, password }) {
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      email,
      password,
    },
    onCompleted: ({ user }) => {
      if (user) {
        localStorage.setItem('token', user.token as string);
        localStorage.setItem('userId', user.id as string);
        isLoggedInVar(true);
      }
    },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}