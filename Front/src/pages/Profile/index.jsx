import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pt from 'prop-types';

import { USER } from '../../constants/userRoles';

import userActions from '../../actions/user';
import adminActions from '../../actions/admin';

import UserInfo from '../../components/blocks/UserInfo';
import UserComputer from '../../components/atoms/userComputer';
import ActiveUserClaims from '../../components/blocks/activeUserClaims';

import './Profile.scss';

class Profile extends Component {
  static propTypes = {
    getAdminInfo: Pt.func,
    editAdmin: Pt.func,
    getUserInfo: Pt.func,
    editUser: Pt.func,
    claims: Pt.array,
    computer: Pt.shape({
      specifications: Pt.any,
      pictureURL: Pt.string,
      underRepair: Pt.bool,
      cabinetNumber: Pt.number
    }),
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
    // eslint-disable-next-line no-unused-expressions
    this.props.userInfo && this.props.userInfo.userRole === USER
      ? this.props.getUserInfo()
      : this.props.getAdminInfo();
  }

  render() {
    return (
      <div className="profile__sections">
        <UserInfo
          userInfo={this.props.userInfo}
          editUser={this.props.editUser}
        />
        {
          this.props.userInfo && this.props.userInfo.userRole === USER
            && <div className="profile__sections__right">
              <ActiveUserClaims
                claims={this.props.claims}
              />
              <UserComputer
                computer={this.props.computer}
              />
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userInfo: store.auth.profile,
  claims: store.claims.claims,
  computer: store.computer.computer
});
const mapActionsToProps = {
  getUserInfo: userActions.getUserInfo,
  getAdminInfo: adminActions.getAdminInfo,
  editUser: userActions.editUser,
  editAdmin: adminActions.editAdmin
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
