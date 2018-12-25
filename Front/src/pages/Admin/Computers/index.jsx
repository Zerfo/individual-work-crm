import React, { Component } from 'react';
import Pt from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../../actions/admin';

import UserComputer from '../../../components/atoms/userComputer';

import './AdminComputers.scss';

class AdminComputers extends Component {
  static propTypes = {
    getComputers: Pt.func,
    computers: Pt.array
  };

  componentDidMount() {
    this.props.getComputers();
  }

  render() {
    return (
      <div className="adminComputer-container">
        {
          this.props.computers
           && this.props.computers.map((item, index) => <UserComputer
             computer={item}
             type={'admin'}
             key={index}
           />)
        }
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
