import React, { Component } from 'react';
import Pt from 'prop-types';

import { Layout } from 'antd';

import NavMenu from '../../atoms/NavMenu';

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

  handleToogle(e) {
    e.preventDefault();
    this.setState({
      isExpaded: !this.state.isExpaded
    });
  }

  render() {
    const isExpaded = this.state.isExpaded;
    return <Layout.Header className="header">
      {
        this.props.profile
          ? <NavMenu onClick={(e) => this.handleToogle(e)} isExpaded={isExpaded} role={this.props.profile.userRoleID} />
          : null
      }
    </Layout.Header>;
  }
}
