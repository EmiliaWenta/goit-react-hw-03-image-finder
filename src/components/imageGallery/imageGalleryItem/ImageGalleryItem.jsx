import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { smallImage, largeImage, alt } = this.props;
    return (
      <li className={css.imageGalleryItem}>
        <img
          src={smallImage}
          alt={alt}
          data-source={largeImage}
          className={css.imageGalleryItemImage}
          data-alt={alt}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
