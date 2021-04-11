import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Me from './components/me';
import People from './components/people';

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/me" component={Me} />
        <Route exact path="/" component={People} />
      </Switch>
    );
  }
}

export default Routes;
