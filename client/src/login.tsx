import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
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
  const [loginFn, { loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      email,
      password,
    },
    onCompleted: ({ login }) => {
      if (login) {
        localStorage.setItem('token', login.token as string);
        localStorage.setItem('userId', login.id as string);
        isLoggedInVar(true);
      }
    },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;

  console.log('HHHHHHHHH', loginFn);
  return loginFn;
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
