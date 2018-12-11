import React from 'react';
import Pt from 'prop-types';

import { Button, Input } from 'antd';

import './EditUserInfo.scss';

const ShowUserInfo = (props) => (
  <div className='userInfo__body__edit'>
    <div className='userInfo__body__edit__generalInfo'>
      <div className='userInfo__body__edit__generalInfo__avatar'>
        <label className='userInfo__body__edit__generalInfo__avatar__label'>Добавить ватар:</label>
        <Button
          className='userInfo__body__edit__generalInfo__avatar__button'
          type="primary"
          shape="circle"
          icon="download"
          size='large'
        />
      </div>
      <div className='userInfo__body__edit__generalInfo__lastName'>
        <label className='userInfo__body__edit__generalInfo__lastName__label'>Фамилия:</label>
        <Input className='userInfo__body__edit__generalInfo__lastName__input' />
      </div>
      <div className='userInfo__body__edit__generalInfo__firstName'>
        <label className='userInfo__body__edit__generalInfo__firstName__label'>Имя:</label>
        <Input className='userInfo__body__edit__generalInfo__firstName__input' />
      </div>
      <div className='userInfo__body__edit__generalInfo__username'>
        <label className='userInfo__body__edit__generalInfo__username__label'>Логин:</label>
        { props.userInfo && props.userInfo.username }
      </div>
      <div className='userInfo__body__edit__generalInfo__email'>
        <label className='userInfo__body__edit__generalInfo__email__label'>Email:</label>
        { props.userInfo && props.userInfo.email }
      </div>
    </div>
    <div className='userInfo__body__edit__additionalInfo'>
      <div className='userInfo__body__edit__additionalInfo__role'>
        <label className='userInfo__body__edit__additionalInfo__role__label'>Роль пользователя:</label>
        { props.userInfo && props.userInfo.userRole }
      </div>
      <div className='userInfo__body__edit__additionalInfo__id'>
        <label className='userInfo__body__edit__additionalInfo__id__label'>id пользователя:</label>
        { props.userInfo && props.userInfo.id }
      </div>
    </div>
  </div>
);

ShowUserInfo.propTypes = {
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

export default ShowUserInfo;
