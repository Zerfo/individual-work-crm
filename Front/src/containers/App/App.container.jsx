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
    getUserInfo: Pt.func,
    profile: Pt.object
  };

  componentDidMount = () => {
    window.onstorage = () => {
      window.location.reload();
    };
    this.props.getUserInfo();
  };

  logout = (event) => {
    event.preventDefault();
    this.props.logout(this.props.profile.id)
      .then(() => localStorage.setItem('token', ''));
  };

  render () {
    const { loggedIn, profile } = this.props;
    return loggedIn
      ? <AppTemplate
        profile={profile}
        logout={this.logout}
      >
        { !profile && loggedIn && <Preloader /> }
        {
          profile && profile.userRole === ADMIN
            ? <AdminRouting/>
            : <UserRouting/>
        }
      </AppTemplate>
      : <Route render={() => <Redirect to={{ pathname: '/login' }} />} />;
  }
}
