import React, { Component } from 'react';
import Pt from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../../actions/admin';

class AdminComputers extends Component {
  static propTypes = {
    getComputers: Pt.func
  };

  componentDidMount() {
    this.props.getComputers();
  }

  render() {
    return (
      <div>
        AdminComputers
      </div>
    );
  }
}

const mapStateToProps = store => ({
  computers: store.computer.computers
});
const mapActionsToProps = {
  getComputers: adminActions.getComputers
};

export default connect(mapStateToProps, mapActionsToProps)(AdminComputers);
