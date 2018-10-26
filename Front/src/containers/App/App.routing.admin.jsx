import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../../pages/Admin/Home';
import NotFound from '../../pages/NotFound';

export default () => (
  <Switch>
    <Redirect from="/" exact to={{ pathname: '/home' }} />
    <Route component={Home} path="/home" />
    <Route component={NotFound} />
  </Switch>
);
