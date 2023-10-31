import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.handleESC);

    document.addEventListener('click', this.props.handleCloseClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.handleESC);
    document.removeEventListener('click', this.props.handleCloseClick);
  }

  render() {
    const { largeImage, alt } = this.props;
    return (
      <div id="close" className={css.overlay}>
        <div className={css.modal}>
          <img src={largeImage} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleESC: PropTypes.func.isRequired,
  handleCloseClick: PropTypes.func.isRequired,
};
