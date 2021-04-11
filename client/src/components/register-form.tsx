import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import login from '../login';

export default function RegisterForm() {
  return (
    <div className="row d-flex justify-content-center form mt-5 pb-5">
      <div className="col-md-3">
        <h4>Register</h4>
        <Formik
          initialValues={{ email: '', password: '', passwordConfirmation: '' }}
          validate={(values) => {
            const errors = { email: '' };
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.password !== values.passwordConfirmation) {
              errors.email = 'Invalid password';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              login(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="d-flex flex-column">
              <Field type="email" name="email" className="mb-3 form-elements" />
              <ErrorMessage name="email" component="div" />
              <Field
                type="password"
                name="password"
                className="mb-3 mt-3 form-elements"
              />
              <ErrorMessage name="password" component="div" />
              <Field
                type="password"
                name="password-confirmation"
                className="mb-3 mt-3 form-elements"
              />
              <ErrorMessage name="passwordConfirmation" component="div" />
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-elements"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
