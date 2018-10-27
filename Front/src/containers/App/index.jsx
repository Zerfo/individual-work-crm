import { connect } from 'react-redux';
import App from './App.container';

import authActions from '../../actions/auth';

const mapStateToProps = store => ({
  loggedIn: store.auth.loggedIn,
  profile: store.auth.profile
});

const mapActionsToProps = {
  logout: authActions.logout
};

export default connect(mapStateToProps, mapActionsToProps)(App);
