import React from 'react';
import Pt from 'prop-types';

import { ADMIN } from '../../../constants/userRoles';
import NavMenuAdmin from './NavMenu.admin';
import NavMenuUser from './NavMenu.user';

import './NavMenu.scss';

const NavMenu = props => props.role === 'ADMIN'
  ? <NavMenuAdmin onClick={props.onClick} isExpaded={props.isExpaded} />
  : <NavMenuUser />;

NavMenu.propTypes = {
  role: Pt.string,
  onClick: Pt.func,
  isExpaded: Pt.bool
};

export default NavMenu;
