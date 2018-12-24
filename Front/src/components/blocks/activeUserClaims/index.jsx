import React, { Component } from 'react';
import Pt from 'prop-types';

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

    const showSmallClaim = (claim, index) => {
      const date = new Date(claim.createdAt);
      const dateClaim = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
      return (
        <div key={index} className="claim">
          <div className="claim__number">{index + 1}.</div>
          <div className="claim__name">{claim.nameClaim}</div>
          <div className="claim__description">{claim.descriptionClaim}</div>
          <div className="claim__dateCreate">{dateClaim}</div>
          <a className="claim__a">Подробнее</a>
        </div>
      );
    };

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
              : claims.map((item, index) => showSmallClaim(item, index))
          }
        </div>
      </div>
    );
  }
}
