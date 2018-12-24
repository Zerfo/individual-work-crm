import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Pt from 'prop-types';

import './ModalTemplate.scss';

export default class ModalTemplate extends Component {
  static propTypes = {
    children: Pt.element,
    onClose: Pt.func
  }

  render() {
    const { onClose } = this.props;
    return createPortal(
      <div className="modalWindowWrapper">
        <div className="overlay" onClick={onClose}/>
        <div className="modal">
          {this.props.children}
        </div>
      </div>,
      document.getElementById('modal')
    );
  }
}
