import css from './style.module.css';
import React, { Component } from 'react';

export default class Modal extends Component {
  handleClick = e => {
    e.target === e.currentTarget && this.props.close();
  };
  handleEsc = e => {
    e.code === 'Escape' && this.props.close();
    console.log('first');
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }
  render() {
    return (
      <div className={css.Overlay} onClick={this.handleClick}>
        <div className={css.Modal}>
          <img src={this.props.openedImage} alt="" />
        </div>
      </div>
    );
  }
}
