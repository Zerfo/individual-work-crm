import React, { Component } from 'react';
import Pt from 'prop-types';

import { Button } from 'antd';

import ShowUserInfo from '../../atoms/ShowUserInfo';
import EditUserInfo from '../../atoms/EditUserInfo';

import './UserInfo.scss';

const ButtonGroup = Button.Group;

export default class UserInfo extends Component {
  static propTypes = {
    userInfo: Pt.shape({
      id: Pt.number,
      userRole: Pt.string,
      email: Pt.string,
      username: Pt.string,
      firstName: Pt.string,
      lastName: Pt.string,
      avatarURL: Pt.string
    })
  };

  static defaultProps = {
    userInfo: {
      id: null,
      userRole: 'USER',
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      avatarURL: ''
    }
  };

  state = {
    componentType: 'show' // show - отображает дпнные, edit - редактирует
  }

  onEditUserInfo = () => this.setState({ componentType: 'edit' });
  onSaveNewUserInfo = () => {
    // отправляем запрос на изменение данных
    // обновляем данные пользователя в приложении
    this.setState({ componentType: 'show' });
  }
  onShowUserInfo = () => this.setState({ componentType: 'show' });

  render() {
    return (
      <div className='userInfo-container'>
        { this.state.componentType === 'show'
          ? <ShowUserInfo userInfo={this.props.userInfo} />
          : <EditUserInfo userInfo={this.props.userInfo} />
        }
        <div className='userInfo__footer'>
          { this.state.componentType === 'show'
            ? <Button
              onClick={this.onEditUserInfo}
              className='userInfo__footer__editUserInfo'
            >
                Редактировать профиль
            </Button>
            : <ButtonGroup className='userInfo__footer__btnGroup'>
              <Button
                onClick={this.onSaveNewUserInfo}
                className='userInfo__footer__btnGroup__save'
              >
                Сохранить
              </Button>
              <a
                onClick={this.onShowUserInfo}
                className='userInfo__footer__btnGroup__cancel'
              >
                Отменить
              </a>
            </ButtonGroup>
          }
        </div>
      </div>
    );
  }
}
