import React, { Component } from 'react';
import Pt from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form } from 'antd';
import Login from './Login.grid';

class LoginPage extends Component {
  static propTypes = {
    form: Pt.object,
    getProfile: Pt.func,
    loggedIn: Pt.bool,
    submitLogin: Pt.func,
    error: Pt.object,
    profileDataReceived: Pt.bool,
    getUserInfo: Pt.func
  };

  submitLogin = event => {
    event.preventDefault();
    const { form: { validateFields }, submitLogin } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const data = values;
        submitLogin(data)
          .then(() => {
            this.props.getUserInfo();
          });
      }
    });
  }

  render() {
    const { loggedIn, form, error, profileDataReceived } = this.props;

    return (loggedIn && profileDataReceived)
      ? <Redirect to={{ pathname: '/' }} />
      : <Login
        getFieldDecorator={form.getFieldDecorator}
        onSubmit={this.submitLogin}
        errorMsg={error}
      />;
  }
}

export default Form.create()(LoginPage);
