import React, { Component } from 'react';
import Pt from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import Preloader from '../../components/atoms/Preloader';
import AppTemplate from '../../components/templates/AppTemplate';
import AdminRouting from './App.routing.admin';
import UserRouting from './App.routing.user';

import { ADMIN } from '../../constants/userRoles';

export default class AppPage extends Component {
  static propTypes = {
    loggedIn: Pt.bool,
    logout: Pt.func,
    profile: Pt.object
  };

  componentDidMount = () => {
    window.onstorage = () => {
      window.location.reload();
    };
  };

  logout = (event) => {
    event.preventDefault();
    //Функция разлогина на сервере
  };

  render () {
    const { loggedIn, profile } = this.props;
    if (!profile && loggedIn) return <Preloader />;
    return loggedIn
      ? <AppTemplate
        profile={profile}
        logout={this.logout}
      >
        {
          profile && profile.userRoleID === ADMIN
            ? <AdminRouting/>
            : <UserRouting/>
        }
      </AppTemplate>
      : <Route render={() => <Redirect to={{ pathname: '/login' }} />} />;
  }
}
