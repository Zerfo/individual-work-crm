import React, { Component } from 'react';
import Pt from 'prop-types';

import { Layout } from 'antd';

import Header from '../../blocks/Header';
import Footer from '../../blocks/Footer';

const { Content } = Layout;

export default class AppTemplate extends Component {
  static propTypes = {
    children: Pt.object,
    logout: Pt.func,
    profile: Pt.object
  };

  render() {
    const { profile, logout } = this.props;

    return (
      <Layout>
        <Header profile={profile} logout={logout} />
        <Layout>
          <Content>
            { this.props.children }
          </Content>
        </Layout>
        <Footer />
      </Layout>
    );
  }
}
