import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import RegisterButton from './register-button';
import { isLoggedInVar } from '../cache';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

const LoginForm = () => {
  const history = useHistory();
  const [mutation, { loading: inFlight, error: err }] = useMutation(
    LOGIN_USER,
    {
      onCompleted: ({ login }) => {
        if (login) {
          localStorage.setItem('token', login.token as string);
          localStorage.setItem('userId', login.id as string);
          isLoggedInVar(true);
          history.push('/');
          window.location.reload();
        }
      },
    },
  );

  if (inFlight) return <h4>Loading...</h4>;
  if (err) return <p>An error occurred</p>;

  return (
    <div className="row m-md-0 m-5 d-flex justify-content-center form mt-5 pb-5">
      <div className="col-md-3">
        <h4 className="ml-n3">Login</h4>

        <>
          <form id="login" className="d-flex flex-column">
            <label htmlFor="email" className="row d-flex flex-column">
              Email:
              <input
                className="col-md-10"
                type="email"
                name="email"
                id="email"
              />
            </label>
            <label htmlFor="password" className="row mb-3 mt-3">
              Password:
              <input
                className="col-md-10"
                type="password"
                name="password"
                id="password"
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="form-elements btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                const email = document.getElementById(
                  'email',
                ) as HTMLInputElement;
                const password = document.getElementById(
                  'password',
                ) as HTMLInputElement;
                mutation({
                  variables: {
                    email: email.value,
                    password: password.value,
                  },
                });
              }}
            />
          </form>
        </>
        <RegisterButton />
      </div>
    </div>
  );
};

export default LoginForm;
