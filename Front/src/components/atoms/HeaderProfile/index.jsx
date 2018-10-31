import React from 'react';
import Pt from 'prop-types';

import { Avatar, Icon } from 'antd';

import './HeaderProfile.scss';

const HeaderProfile = props => {
  return (
    <div className="header-profile">
      <div className="header-profile__name">
        <span>{props.profile.name}</span>
      </div>
      <Avatar size="large" icon="user" src={props.profile.photo} />
      <div className="header-profile__logout">
        <a onClick={props.logout}>
          <Icon type="logout" style={{ fontSize: 16, color: '#fff' }} />
        </a>
      </div>
    </div>
  );
};

HeaderProfile.propTypes = {
  profile: Pt.shape({
    name: Pt.string,
    photo: Pt.string
  }),
  logout: Pt.func
};

export default HeaderProfile;
