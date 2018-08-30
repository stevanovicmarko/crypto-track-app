import React from 'react';
import './loader.scss';

const withLoader = loaderProps => RegularComponent => ({ isLoading, ...otherProps }) =>
  isLoading ? (
    <div className="loader">
      <h1>{(loaderProps && loaderProps.loaderTitle) || 'Loading...'}</h1>
      <div className="spinner" />
    </div>
  ) : (
    <RegularComponent {...otherProps} />
  );

export default withLoader;
