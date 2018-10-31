import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Profile from '../../pages/Profile';
import AdminClaims from '../../pages/Admin/Claims';
import AdminComputers from '../../pages/Admin/Computers';
import NotFound from '../../pages/NotFound';

export default () => (
  <Switch>
    <Redirect from="/" exact to={{ pathname: '/profile' }} />
    <Route component={Profile} path="/profile" />
    <Route component={AdminClaims} path="/claims" />
    <Route component={AdminComputers} path="/computers" />
    <Route component={NotFound} />
  </Switch>
);
