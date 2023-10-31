//React
import React, { Component } from 'react';

// css
import css from './App.module.css';

// Library:
import axios from 'axios';
import Notiflix from 'notiflix';
// import PropTypes from 'prop-types';

// Components:
import Searchbar from './searchbar/Searchbar';
// import Loader from './loader/Loader';
// import Button from './button/Button';
// import Modal from './modal/Modal';
// import ImageGallery from './image_gallery/ImageGallery';

export class App extends Component {
  state = {
    isLoading: false,
    isModalVisible: false,
    currentPage: 1,
    images: [],
    error: '',
    prevQuery: '',
  };

  onSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.query.value;
    switch (query) {
      case '':
        Notiflix.Notify.warning(`Please complete this field`);
        break;
      case this.state.prevQuery:
        Notiflix.Notify.info(
          `We're sorry, but result for the ${this.state.prevQuery} have already been found. Please try finding something else.`
        );
        break;
      default:
        this.setState(
          {
            prevQuery: query,
            currentPage: 1,
            images: [],
            query: query,
          },
          () => this.getImages()
        );
    }
  };

  getImages = async () => {
    const { query, currentPage } = this.state;
    const searchParams = new URLSearchParams({
      q: query,
      page: currentPage,
      key: '39263607-31e6aac38a3d7521590b9a431',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });

    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?${searchParams}`
      );
      const images = await response.data.hits;
      if (images.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search ${query}. Please try again.`
        );
      }

      const newImages = [...this.state.images, ...images];
      this.setState({ images: newImages });
    } catch (error) {
      this.setState({ error: error.toString() });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { isLoading, isModalVisible, images, modalImageURL } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}
