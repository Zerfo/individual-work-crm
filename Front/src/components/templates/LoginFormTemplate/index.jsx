import React, { Component } from 'react';
import Pt from 'prop-types';

import { Layout, Card } from 'antd';

import './LoginFormTemplate.scss';

const { Content } = Layout;

export default class LoginFormTemplate extends Component {
  static propTypes = {
    children: Pt.object,
    logout: Pt.func
  };

  render() {
    return <Layout className="login-layout">
      <Content className="login-layout-content">
        <Card>
          { this.props.children }
        </Card>
      </Content>
    </Layout>;
  }
}
