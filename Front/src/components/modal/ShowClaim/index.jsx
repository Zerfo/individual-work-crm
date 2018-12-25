import React, { Component } from 'react';
import Pt from 'prop-types';
import { connect } from 'react-redux';

import { Button } from 'antd';

import userActions from '../../../actions/user';

import './ShowClaim.scss';

class ShowClaim extends Component {
  static propTypes = {
    onClose: Pt.func,
    closeClaim: Pt.func,
    getClaims: Pt.func,
    type: Pt.string,
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
  }

  closeClaim = async () => {
    await this.props.closeClaim();
    this.props.getClaims();
  }

  render() {
    const { onClose, claim } = this.props;
    const date = new Date(claim.createdAt);
    const dateClaim = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;

    return (
      <div className="showClaimModal">
        <div className="showClaimModal__exit" onClick={onClose}>X</div>
        <div className="showClaimModal__main">
          <div className="showClaimModal__main__header">
            <div className="showClaimModal__main__header__id">
              Номер заявки: №{claim.id}
            </div>
            <div className="showClaimModal__main__header__status">
              Статус заявки: {claim.statusClaim}
            </div>
          </div>
          <div className="showClaimModal__main__name">
            {claim.nameClaim}
          </div>
          <div className="showClaimModal__main__description">
            {claim.descriptionClaim}
          </div>
          <div className="showClaimModal__main__footer">
            <div className="showClaimModal__main__footer__date">
              Заявка создана {dateClaim}
            </div>
            {
              this.props.type === 'user'
                && <Button
                  onClose={this.closeClaim}
                  className="showClaimModal__main__footer__closeClaim"
                >
                    Закрыть заявку
                </Button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  closeClaim: userActions.closeClaim,
  getClaims: userActions.getClaims
};

export default connect(null, mapActionsToProps)(ShowClaim);
