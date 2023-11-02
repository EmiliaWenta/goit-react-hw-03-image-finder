import React, { Component } from 'react';
import css from './App.module.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Components:
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

export class App extends Component {
  state = {
    currentPage: 1,
    images: [],
    error: '',
    prevQuery: '',
    isLoading: false,
    shownModal: false,
  };

  onSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.query.value;
    switch (query) {
      case '':
        Notify.warning(`Please complete this field`);
        break;
      case this.state.prevQuery:
        Notify.info(
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
        Notify.failure(
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

  handleClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleModal = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({
      shownModal: true,
      largeImage: event.target.dataset.source,
      largeImageAlt: event.target.getAttribute('alt'),
    });
  };

  handleCloseModalESC = event => {
    if (event.key === 'Escape') {
      this.setState({
        shownModal: false,
      });
    }
  };

  handleCloseModalClick = event => {
    if (event.target.id === 'close') {
      this.setState({
        shownModal: false,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const nextPageData = this.state;
    if (nextPageData.currentPage !== prevState.currentPage) {
      this.getImages();
    }
  }
  render() {
    const { images, isLoading, shownModal, largeImage, largeImageAlt } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} handleModal={this.handleModal} />
        {images.length > 0 && <Button onClick={this.handleClick} />}
        {isLoading && <Loader />}
        {shownModal && (
          <Modal
            largeImage={largeImage}
            alt={largeImageAlt}
            handleESC={this.handleCloseModalESC}
            handleCloseClick={this.handleCloseModalClick}
          />
        )}
      </div>
    );
  }
}
