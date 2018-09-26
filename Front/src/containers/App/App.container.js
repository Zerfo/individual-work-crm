/* @flow */
import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../../pages/Login';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" exact to={{ pathname: '/login ' }} />
        <Route component={Login} path="/login" />
      </Switch>
    </BrowserRouter>
  );
};
