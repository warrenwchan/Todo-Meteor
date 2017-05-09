import React from 'react';

const ToDoItem = ({item, toggleComplete, removeToDo}) => (
  <li>{item.title}
    <input
       type="checkbox"
       id={item.id}
       checked={item.complete}
       onChange={toggleComplete}
      />
    <label htmlFor={item.id}></label>
    <button onClick={removeToDo}>
       <i className="fa fa-trash"></i>
    </button>
  </li>
);

export default ToDoItem;
