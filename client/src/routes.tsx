import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Me from './components/me';
import People from './components/people';
import Person from './components/person';
import Header from './components/header';

export class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/me" component={Me} />
        <Route exact path="/" component={People} />
        <Route exact path="/people" component={People} />
        <Route exact path="/person" component={Person} />
      </div>
    );
  }
}

export default Routes;
