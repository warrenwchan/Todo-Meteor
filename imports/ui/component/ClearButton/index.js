import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = ({removeCompleted}) => (
  <button onClick={removeCompleted}> Clear complete </button>
);

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default ClearButton;
