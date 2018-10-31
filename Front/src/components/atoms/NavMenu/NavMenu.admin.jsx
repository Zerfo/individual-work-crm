import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './NavMenu.scss';

const menuList = [{
  key: '1',
  link: '/profile',
  name: 'Мой профиль'
}, {
  key: '2',
  link: '/claims',
  name: 'Заявки'
},
{
  key: '3',
  link: '/computers',
  name: 'Компьютерная техника'
}];

export default class NavMenuUser extends Component {
  static propTypes = {
    isExpaded: PropTypes.bool,
    onClick: PropTypes.func
  }

  render() {
    const isExpaded = this.props.isExpaded;
    const onClick = this.props.onClick;

    const menuClass = classNames('menu', {
      'menu--open': !isExpaded
    });
    const menuShadow = classNames('menu-shadow', {
      'menu-shadow--open': !isExpaded
    });
    const headerMenu = classNames('header-menu', {
      'header-menu--open': !isExpaded
    });

    return <div className={menuClass}>
      <div className={menuShadow} onClick={onClick} />
      <ul className={headerMenu}>
        {menuList.map(menu =>
          <li key={menu.key} className="header-menu__item" role="menuitem" aria-selected="false">
            <NavLink
              to={menu.link}
              className="header-menu__link"
              activeClassName="header-menu__active"
            >
              <span>{menu.name}</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>;
  }
}
