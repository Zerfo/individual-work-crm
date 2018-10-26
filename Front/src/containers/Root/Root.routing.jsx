import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../App';
import Login from '../../pages/Login';
import { BrowserRouter } from 'react-router-dom';

export class Root extends Component {
  render () {
    return <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/' component={App} />
      </Switch>
    </BrowserRouter>;
  }
}

export default Root;
