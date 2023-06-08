import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Profile from './components/me';
import People from './components/people';
import Person from './components/person';
import Header from './components/header';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';

export class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/me" component={Profile} />
        <Route exact path="/" component={People} />
        <Route exact path="/people" component={People} />
        <Route exact path="/person" component={Person} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default Routes;
