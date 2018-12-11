import React from 'react';
import Pt from 'prop-types';

import './ShowUserInfo.scss';

const ShowUserInfo = (props) => (
  <div className='userInfo__body__show'>
    <div className='userInfo__body__show__generalInfo'>
      {
        props.userInfo
        && props.userInfo.firstName !== null
        && props.userInfo.lastName !== null
          ? <div className='userInfo__body__show__generalInfo__FLName'>
            {/*
              TODO: Выводить сохраненное на бэке изображение аватара
                    Если его нет, то дефолтное значение
            */}
            { props.userInfo.lastName } { props.userInfo.firstName }
          </div>
          : null
      }
      <div className='userInfo__body__show__generalInfo__username'>
        <label className='userInfo__body__show__generalInfo__username__label'>Логин:</label>
        { props.userInfo && props.userInfo.username }
      </div>
      <div className='userInfo__body__show__generalInfo__email'>
        <label className='userInfo__body__show__generalInfo__email__label'>Адерс Эл. почты:</label>
        { props.userInfo && props.userInfo.email }
      </div>
    </div>
    <div className='userInfo__body__show__additionalInfo'>
      <div className='userInfo__body__show__additionalInfo__role'>
        <label className='userInfo__body__show__additionalInfo__role__label'>Роль пользователя:</label>
        { props.userInfo && props.userInfo.userRole }
      </div>
      <div className='userInfo__body__show__additionalInfo__id'>
        <label className='userInfo__body__show__additionalInfo__id__label'>id пользователя:</label>
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
