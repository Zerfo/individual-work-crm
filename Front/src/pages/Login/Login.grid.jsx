import React from 'react';
import Pt from 'prop-types';

import { Form, Button, Input, Icon, Alert } from 'antd';

import { REQUIRED } from '../../helpers/validation';
import LoginFormTemplate from '../../components/templates/LoginFormTemplate';

import './Login.scss';

const { Item: FormItem } = Form;

const Login = props => (
  <LoginFormTemplate>
    <Form onSubmit={props.onSubmit} className="login-form">
      <FormItem>
        { props.getFieldDecorator('login', {
          rules: [REQUIRED]
        })(<Input size="large" prefix={<Icon type="user" />} placeholder={props.loginPlaceholder} />
        )}
      </FormItem>
      <FormItem>
        { props.getFieldDecorator('password', {
          rules: [REQUIRED]
        })(
          <Input type="password" size="large" prefix={<Icon type="lock" />} placeholder={props.passwordPlaceholder} />
        )}
      </FormItem>
      { props.errorMsg ? (
        <FormItem>
          <Alert message="Неправильный логин или пароль" type="error" showIcon />
        </FormItem>
      ) : null}
      <FormItem>
        <a className="login-form-forgot" href="">
          { props.forgotPassword }
        </a>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button">
          { props.submitCaption }
        </Button>
      </FormItem>
    </Form>
  </LoginFormTemplate>
);
Login.propTypes = {
  forgotPassword: Pt.any,
  submitCaption: Pt.string,
  passwordPlaceholder: Pt.string,
  loginPlaceholder: Pt.string,
  errorMsg: Pt.string,
  onSubmit: Pt.func,
  getFieldDecorator: Pt.func
};
Login.defaultProps = {
  loginPlaceholder: 'Имя пользователя',
  passwordPlaceholder: 'Пароль',
  submitCaption: 'Войти'
};


export default Login;
