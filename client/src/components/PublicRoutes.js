import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import Header from '../Header';

export class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/" component={LoginForm} />
      </div>
    );
  }
}

export default Routes;
