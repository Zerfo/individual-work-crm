import React, { Component } from 'react';
import Pt from 'prop-types';
import { connect } from 'react-redux';

import userActions from '../../../actions/user';

import ClaimCard from '../../../components/atoms/ClaimCard';

import './Claims.scss';

class UserClaims extends Component {
  static propTypes = {
    getClaims: Pt.func,
    claims: Pt.array
  }
  componentDidMount () {
    this.props.getClaims();
  }

  render() {
    return (
      <div className="userClaim-container">
        {
          this.props.claims.map((item, index) => <ClaimCard claim={item} key={index} />)
        }
      </div>
    );
  }
}
const mapStateToProps = store => ({
  claims: store.claims.claims
});
const mapActionsToProps = {
  getClaims: userActions.getClaims
};

export default connect(mapStateToProps, mapActionsToProps)(UserClaims);
