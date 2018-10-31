import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Profile from '../../pages/Profile';
import UserClaims from '../../pages/User/Claims';
import NotFound from '../../pages/NotFound';

export default () => (
  <Switch>
    <Redirect from="/" exact to={{ pathname: '/profile' }} />
    <Route component={Profile} path="/profile" />
    <Route component={UserClaims} path="/claims" />
    <Route component={NotFound} />
  </Switch>
);
