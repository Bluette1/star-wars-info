import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './components/login-form';
import Me from './components/me';
import RegisterForm from './components/register-form ';

export class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/me" component={Me} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
