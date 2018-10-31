import React, { Component } from 'react';
import Pt from 'prop-types';

import { Layout } from 'antd';

import NavMenu from '../../atoms/NavMenu';
import HeaderProfile from '../../atoms/HeaderProfile';

import './Header.scss';

export default class MainHeader extends Component {
  static propTypes = {
    isExpaded: Pt.bool,
    logout: Pt.func,
    profile: Pt.object
  }

  state = {
    isExpaded: true
  };

  handleToogle = event => {
    event.preventDefault();
    this.setState({ isExpaded: !this.state.isExpaded });
  }

  render() {
    const isExpaded = this.state.isExpaded;
    return <Layout.Header className="header">
      { this.props.profile ? <NavMenu
        onClick={event => this.handleToogle(event)}
        isExpaded={isExpaded}
        role={this.props.profile.userRoleID} /> : null
      }
      { this.props.profile ? <HeaderProfile
        logout={this.props.logout}
        profile={this.props.profile} /> : null
      }
    </Layout.Header>;
  }
}
