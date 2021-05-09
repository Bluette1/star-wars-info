import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';
import Header from './components/header';

export class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/register" component={RegisterForm} />
        {/* <Route exact path="/" component={LoginForm} /> */}
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default Routes;
