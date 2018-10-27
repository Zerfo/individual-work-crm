import { connect } from 'react-redux';

import Login from './Login.container';
import authActions from '../../actions/auth';

const mapActionsToProps = {
  submitLogin: authActions.login
};

export default connect(null, mapActionsToProps)(Login);
