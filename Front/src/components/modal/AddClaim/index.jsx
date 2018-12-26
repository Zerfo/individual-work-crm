import React, { Component } from 'react';
import Pt from 'prop-types';
import { connect } from 'react-redux';

import { Input, Button } from 'antd';

import userActions from '../../../actions/user';

import './AddClaim.scss';

const TextArea = Input.TextArea;

class AddClaim extends Component {
  static propTypes = {
    onClose: Pt.func,
    createClaim: Pt.func,
    getClaims: Pt.func,
    userID: Pt.number
  }

  state = {
    name: '',
    description: ''
  }

  getNameClaim = value => this.setState({ name: value });
  getDescriptionClaim = value => this.setState({ description: value });
  submitClaim = async () => {
    const data = {
      name: this.state.name,
      descriptionClaim: this.state.description,
      userID: this.props.userID
    };

    await this.props.createClaim(data);
    this.props.onClose();
    this.props.getClaims();
  }

  render() {
    const { onClose } = this.props;

    return (
      <div className="addClaimModal">
        <div className="addClaimModal__exit" onClick={onClose}>X</div>
        <h2 className="addClaimModal__h2">Создание новой заявки</h2>
        <div className="addClaimModal__main">
          <div className="addClaimModal__main__name">
            <div className="addClaimModal__main__name__text">Тема:</div>
            <Input
              onChange={e => this.getNameClaim(e.target.value)}
              className="addClaimModal__main__name__input"
            />
          </div>
          <div className="addClaimModal__main__description">
            <div className="addClaimModal__main__description__text">Текст: </div>
            <TextArea
              onChange={e => this.getDescriptionClaim(e.target.value)}
              className="addClaimModal__main__description__input"
              style={{ height: 99, resize: 'none', width: 460 }}
            />
          </div>
        </div>
        <div className="addClaimModal__footer">
          <Button
            onClick={this.submitClaim}
            className="addClaimModal__footer__submit"
          >
          Отправить
          </Button>
          <Button
            onClick={onClose}
            className="addClaimModal__footer__cancel"
          >
            Отменить
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  userID: store.auth.profile.id
});

const mapActionToProps = {
  createClaim: userActions.createClaim,
  getClaims: userActions.getClaims
};

export default connect(mapStateToProps, mapActionToProps)(AddClaim);
