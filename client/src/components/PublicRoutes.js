import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './login-form';
import RegisterForm from './register-form';

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    );
  }
}

export default Routes;
