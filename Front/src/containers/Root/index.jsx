import { connect } from 'react-redux';

import Root from './Root.container';

const mapStateToProps = () => ({
  authToken: localStorage.getItem('authToken')
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Root);
