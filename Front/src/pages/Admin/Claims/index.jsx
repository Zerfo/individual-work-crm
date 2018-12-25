import React, { Component } from 'react';
import Pt from 'prop-types';
import { connect } from 'react-redux';

import ClaimCard from '../../../components/atoms/ClaimCard';

import adminActions from '../../../actions/admin';

import './AdminClaims.scss';

class AdminClaims extends Component {
  static propTypes = {
    getClaims: Pt.func,
    claims: Pt.array
  }

  componentDidMount() {
    this.props.getClaims();
  }

  render() {
    return (
      <div className="adminClaim-container">
        {
          this.props.claims
            && this.props.claims.map((item, index) => <ClaimCard
              claim={item}
              type={'admin'}
              key={index}
            />)
        }
      </div>
    );
  }
}
const mapStateToProps = store => ({
  claims: store.claims.claims
});
const mapActionsToProps = {
  getClaims: adminActions.getClaims
};

export default connect(mapStateToProps, mapActionsToProps)(AdminClaims);
