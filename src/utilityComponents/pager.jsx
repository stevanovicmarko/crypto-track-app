import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './pager.scss';

const Pager = ({ numberOfPages, activePage, pageChangeFunc }) => (
  <div className="pager-container">
    {[...Array(numberOfPages)].map((_unused, v) => v + 1).map(i => (
      <div
        key={i}
        className={['pager-button', ...Array.from(i == activePage && ['active-page'])].join(' ')}
        onClick={() => pageChangeFunc(i)}
      >
        {i}
      </div>
    ))}
  </div>
);

export default Pager;
