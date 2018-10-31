import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import './Preloader.scss';

export default class Preloader extends Component {
  render() {
    return ReactDOM.createPortal(
      <div className="preloader-layout">
        <Spin/>
      </div>,
      document.getElementById('preloader-layout')
    );
  }
}
