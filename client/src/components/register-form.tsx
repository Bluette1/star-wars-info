import React from 'react';
import register from '../register';

export default function RegisterForm() {
  return (
    <div className="row d-flex justify-content-center form mt-5 pb-5">
      <div className="col-md-3">
        <h4>Login</h4>

        <>
          <form id="login" className="d-flex flex-column">
            <label htmlFor="email" className="row d-flex flex-column">
              Email:
              <input className="col-md-10" type="email" name="email" id="email" />
            </label>
            <label htmlFor="password" className="row mb-3 mt-3">
              Password:
              <input className="col-md-10" type="password" name="password" id="password" />
            </label>
            <label htmlFor="password" className="row mb-3 mt-3">
              Name:
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
                register({ email: email.value, password: password.value, name: name.value });
              }}
            />
          </form>
        </>
      </div>
    </div>
  );
}
