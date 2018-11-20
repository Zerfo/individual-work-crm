import React, { Component } from 'react';
import Pt from 'prop-types';

export default class Userdata extends Component {
  static propTypes = {
    userInfo: Pt.shape({
      id: Pt.number,
      userRole: Pt.string,
      email: Pt.string,
      username: Pt.string,
      firstName: Pt.string,
      lastName: Pt.string,
      avatarURL: Pt.string
    })
  };

  render() {
    return <div>UserData</div>;
  }
}
