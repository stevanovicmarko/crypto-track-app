import React from 'react';
import PropTypes from 'prop-types';

import './error.scss';

const Error = ({ error }) => (
  <div>
    <h3 className="error-message">{`${error}`}</h3>
  </div>
);

Error.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default Error;
