import React, { Component } from 'react';
import Pt from 'prop-types';
import RootRouting from './Root.routing';

export default class RootPage extends Component {
  static propTypes = {
    authToken: Pt.string
  };

  componentDidMount () {
    const { authToken } = this.props;

    if (authToken) {
      //Функция проверки токена
      //В случае протухшего токена, обновляем его
    }
  }

  render () {
    return <RootRouting/>;
  }
}
