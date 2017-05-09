import React from 'react';
import ReactDOM from 'react-dom';
import App from './../imports/ui/container/App/index';
import { Meteor } from 'meteor/meteor';

import { createStore } from 'redux';

//function that makes variable that takes the text of input
const addTodo = payload => ({ type: 'ADD_TODO', payload });

const removeTodo = payload => ({ type: 'REMOVE_TODO', payload });

const initialState = {
  todos: [],
  lastId: 0
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      const todo = {
        id: state.lastId,
        text: action.payload,
        completed: false
      };
      return {
        ...state,
        todos: [...state.todos, todo],
        lastId: state.lastId + 1 };

    case 'REMOVE_TODO':
      const todos = state.todos.filter(todo => action.payload !== todo.id);
      return Object.assign ({}, state, { todos });
      return { ...state, todos };

    default:
      return state;
  }
};

const store = createStore(reducer);

console.log('initial', store.getState())

store.dispatch(addTodo('Make Next Feature'))

console.log('after', store.getState())

store.dispatch(addTodo('Make Next Feature'))
store.dispatch(addTodo('Make Next Feature'))
store.dispatch(addTodo('Make Next Feature'))

console.log('after added more', store.getState())


Meteor.startup(() => {
  Meteor.autorun(() => {
    ReactDOM.render(<App />, document.getElementById('app'));
  })
});
