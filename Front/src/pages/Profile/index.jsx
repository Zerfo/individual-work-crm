import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pt from 'prop-types';

import userActions from '../../actions/user';

class Profile extends Component {
  static propTypes = {
    getUserInfo: Pt.func
  };

  componentDidMount () {
    this.props.getUserInfo();
  }

  render() {
    return (
      <div>
        Profile
      </div>
    );
  }
}

const mapActionsToProps = {
  getUserInfo: userActions.getUserInfo
};

export default connect(null, mapActionsToProps)(Profile);
