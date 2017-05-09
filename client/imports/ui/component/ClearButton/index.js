import React from 'react';

const ClearButton = ({removeCompleted}) => (
  <button onClick={removeCompleted}> Clear complete </button>
);

export default ClearButton;
