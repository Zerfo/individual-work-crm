import React, { Component } from 'react';
import Pt from 'prop-types';

import ModalTemplate from '../../templates/ModalTemplate';
import ShowClaim from '../../modal/ShowClaim';

import './ClaimCard.scss';

export default class ClaimCard extends Component {
  static propTypes = {
    claim: Pt.shape({
      id: Pt.number,
      userID: Pt.number,
      computerID: Pt.number,
      statusClaim: Pt.string,
      nameClaim: Pt.string,
      descriptionClaim: Pt.string,
      commentsClaim: Pt.array,
      resolveClaim: Pt.number,
      createdAt: Pt.string,
      updatedAt: Pt.string
    })
  };

  state = {
    showModalMoreInfo: false
  }

  showMoreInfo = () => this.setState({ showModalMoreInfo: !this.state.showModalMoreInfo });

  render () {
    const {
      id,
      statusClaim,
      nameClaim,
      descriptionClaim,
      createdAt
    } = this.props.claim;

    const date = new Date(createdAt);
    const dateClaim = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    return (
      <div className="card">
        <div className="card__id">id: {id}</div>
        <div className="card__header">
          <h3 className="card__header__h3">{nameClaim}</h3>
          <div className="card__header__status">{statusClaim}</div>
        </div>
        <div className="card__body">
          <div className="card__body__description">{descriptionClaim}</div>
          <div className="card__body__date">{dateClaim}</div>
        </div>
        <a className="card__a" onClick={this.showMoreInfo}>Подробнее</a>
        {this.state.showModalMoreInfo
          && <ModalTemplate onClose={this.showMoreInfo}>
            <ShowClaim onClose={this.showMoreInfo}/>
          </ModalTemplate>
        }
      </div>
    );
  }
}
