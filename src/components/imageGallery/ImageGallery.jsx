import React, { Component } from 'react';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    const { images, handleModal } = this.props;

    return (
      <ul className={css.imageGallery} onClick={handleModal}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            smallImage={image.webformatURL}
            largeImage={image.largeImageURL}
            alt={image.tags}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  handleModal: PropTypes.func.isRequired,
};
