import React, { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className={css.divForButton}>
        <button className={css.button} onClick={onClick}>
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
