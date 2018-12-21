import React, { Component } from 'react';
import Pt from 'prop-types';

import ClaimCard from '../../atoms/ClaimCard';

import './activeUserClaims.scss';

export default class ActiveUserClaims extends Component {
  static propTypes = {
    claims: Pt.array
  };

  static defaultProps = {
    claims: []
  };

  render() {
    const { claims } = this.props;
    return (
      <div className="userClaims-container">
        <div className="userClaims-container__title">
          <h2 className="userClaims-container__title__h2">Активные заявки:</h2>
          <a className="userClaims-container__title__a">Создать новую заявку</a>
        </div>
        <div className="userClaims-container__body">
          {
            claims === null
              ? <p className="userClaims-container__body__p">
                На данный момент у вас нет активных заявок.
              </p>
              : claims.map((item, index) => <ClaimCard key={index} claim={item} />)
          }
        </div>
      </div>
    );
  }
}
