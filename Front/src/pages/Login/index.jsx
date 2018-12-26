import { connect } from 'react-redux';

import Login from './Login.container';
import authActions from '../../actions/auth';
import { getUserInfo } from '../../actions/user';

const mapStateToProps = store => ({
  loggedIn: store.auth.loggedIn,
  profileDataReceived: store.auth.profileDataReceived
});

const mapActionsToProps = {
  submitLogin: authActions.login,
  getUserInfo
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
