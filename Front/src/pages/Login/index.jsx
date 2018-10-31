import { connect } from 'react-redux';

import Login from './Login.container';
import authActions from '../../actions/auth';

const mapStateToProps = store => ({
  loggedIn: store.auth.loggedIn,
  profileDataReceived: store.auth.profileDataReceived
});

const mapActionsToProps = {
  submitLogin: authActions.login
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
