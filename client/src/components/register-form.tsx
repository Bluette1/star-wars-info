import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { isLoggedInVar } from '../cache';
import LoginButton from './login-button';

export const REGISTER_USER = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`;

export default function RegisterForm() {
  const history = useHistory();
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: ({ signup }) => {
      if (signup) {
        localStorage.setItem('token', signup.token as string);
        localStorage.setItem('userId', signup.id as string);
        isLoggedInVar(true);
        history.push('/');
        window.location.reload();
      }
    },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;

  return (
    <div className="row m-md-0 m-5 d-flex justify-content-center form mt-5 pb-5">
      <div className="col-md-3">
        <h4 className="ml-n3">Register</h4>

        <>
          <form id="login" className="d-flex flex-column">
            <label htmlFor="email" className="row d-flex flex-column">
              <p>Email:</p>
              <input
                className="col-md-10"
                type="email"
                name="email"
                id="email"
              />
            </label>
            <label
              htmlFor="password"
              className="row d-flex flex-column mb-3 mt-3"
            >
              <p>Password:</p>
              <input
                className="col-md-10"
                type="password"
                name="password"
                id="password"
              />
            </label>
            <label
              htmlFor="password"
              className="row d-flex flex-column mb-3 mt-3"
            >
              <p>Confirm password:</p>
              <input
                className="col-md-10"
                type="password"
                name="confirm-password"
                id="confirm-password"
              />
            </label>
            <label htmlFor="name" className="row d-flex flex-column mb-3 mt-3">
              <p>Name:</p>
              <input className="col-md-10" type="text" name="name" id="name" />
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
                const name = document.getElementById(
                  'name',
                ) as HTMLInputElement;
                registerUser({
                  variables: {
                    email: email.value,
                    password: password.value,
                    name: name.value,
                  },
                });
              }}
            />
          </form>
        </>
        <LoginButton />
      </div>
    </div>
  );
}
