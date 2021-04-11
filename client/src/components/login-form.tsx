import React from 'react';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

export default function LoginForm({ login }) {
  return (
    <div className="row d-flex justify-content-center form">
      <div className="col-md-3">
        <h4>Login</h4>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = { email: '' };
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              login(values.email, values.password);
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
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
