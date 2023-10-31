import React, { Component } from 'react';
import css from './Loader.module.css';
import { InfinitySpin } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <InfinitySpin
          animationDuration="1"
          width="200"
          visible={true}
          color="#3f51b5"
        />
      </div>
    );
  }
}
