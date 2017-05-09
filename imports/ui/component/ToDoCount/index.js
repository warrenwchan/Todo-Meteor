import React from 'react';
import PropTypes from 'prop-types';

const ToDoCount = ({number}) => (
  <p>{number} {number === 1 ? 'ToDo' : 'ToDos'} </p>
);

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

export default ToDoCount;
