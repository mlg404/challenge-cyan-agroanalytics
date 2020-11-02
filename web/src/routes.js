import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomeMap from './pages/HomeMap';
import Add from './pages/Add';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeMap} />
        <Route path="/add" component={Add} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;