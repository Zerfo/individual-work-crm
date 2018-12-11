import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pt from 'prop-types';

import userActions from '../../actions/user';

import UserInfo from '../../components/blocks/UserInfo';

class Profile extends Component {
  static propTypes = {
    getUserInfo: Pt.func,
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

  componentDidMount () {
    this.props.getUserInfo();
  }

  render() {
    return (
      <div>
        Profile
        <UserInfo userInfo={this.props.userInfo} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userInfo: store.auth.profile
});
const mapActionsToProps = {
  getUserInfo: userActions.getUserInfo
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
