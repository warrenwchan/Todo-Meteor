import React from 'react';

const ToDoCount = ({number}) => (
  <p>{number} {number === 1 ? 'ToDo' : 'ToDos'} </p>
);

export default ToDoCount;
