import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Me from './components/me';
import People from './components/people';
import Header from './Header';

export class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/me" component={Me} />
        <Route exact path="/" component={People} />
      </div>
    );
  }
}

export default Routes;
