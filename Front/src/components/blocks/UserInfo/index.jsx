import React, { Component } from 'react';
import Pt from 'prop-types';

import { Button } from 'antd';

import ShowUserInfo from '../../atoms/ShowUserInfo';
import EditUserInfo from '../../atoms/EditUserInfo';

import './UserInfo.scss';

const ButtonGroup = Button.Group;

export default class UserInfo extends Component {
  static propTypes = {
    editUser: Pt.func,
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
    componentType: 'show', // show - отображает дпнные, edit - редактирует
    avatarURL: this.props.userInfo && this.props.userInfo.avatarURL || '',
    lastName: this.props.userInfo && this.props.userInfo.lastName || '',
    firstName: this.props.userInfo && this.props.userInfo.firstName || ''
  }

  getAvatarURL = value => this.setState({ avatarURL: value });
  getLastName = value => this.setState({ lastName: value });
  getFirstName = value => this.setState({ firstName: value });

  onEditUserInfo = () => this.setState({ componentType: 'edit' });
  onSaveNewUserInfo = async () => {
    const data = {
      avatarURL: this.state.avatarURL,
      lastName: this.state.lastName,
      firstName: this.state.firstName
    };
    await this.props.editUser(data);
    this.setState({ componentType: 'show' });
  }
  onShowUserInfo = () => this.setState({ componentType: 'show' });

  render() {
    return (
      <div className='userInfo-container'>
        { this.state.componentType === 'show'
          ? <ShowUserInfo userInfo={this.props.userInfo} />
          : <EditUserInfo
            userInfo={this.props.userInfo}
            value={{
              avatarURL: this.state.avatarURL,
              lastName: this.state.lastName,
              firstName: this.state.firstName
            }}
            getValue={{
              getAvatarURL: this.getAvatarURL,
              getLastName: this.getLastName,
              getFirstName: this.getFirstName
            }}
          />
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
