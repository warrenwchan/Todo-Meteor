import React, { Component } from 'react';
import { ToDos } from '../../../api/todos';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import './styles.css';

import ToDoItem from './../../component/ToDoItem/index'
import ToDoCount from './../../component/ToDoCount/index'
import ClearButton from './../../component/ClearButton/index'

class App extends Component {
  constructor(todos){
    super(todos);

    this.state = {
      todos: [
        {
          id: 0,
          title: 'Learn React',
          complete: false,
        }
      ],
      lastId: 0,
      inputValue: ''
    };
    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
  }

  toggleComplete(item) {
    ToDos.update(item._id, { $set: {complete: !item.complete}});
  }

  removeToDo (item) {
    ToDos.remove(item._id);
  }

  removeCompleted() {
    ToDos.find({complete: true}).forEach((todo) => {
      ToDos.remove(todo._id);
    })

    // const completedTodos = this.props.todos.filter((item) => item.complete);

    // completedTodos.foreach((completedTodos) => {
    //   ToDos.remove(completedTodos._id);
    // })
  }

  hasCompleted(item) {
    let completedTodos = this.props.todos.filter((todo) => todo.complete);
    if (completedTodos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addToDo (event) {
    event.preventDefault();

    if(this.state.inputValue) {

      ToDos.insert({
        title: this.state.inputValue,
        complete: false
      })

      this.setState({
        inputValue: '',
      });

    }
  }

  onInputChange(event) {
    // event.preventDefault();
    this.setState({inputValue: event.target.value})
  }

  componentDidMount() {
    // this.toDoInput.focus()
  }

  render() {
    console.log(this.state.inputValue);
    return (
      <div className="todo-list">
        <h1>So much to do</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
              <input
                type="text"
                value={this.state.inputValue}
                onChange={(e) => this.onInputChange(e)}
              />
              <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.props.todos.map((todo, i) => (
            <ToDoItem
              item={todo}
              key={i}
              toggleComplete={() => this.toggleComplete(todo)}
              removeToDo={()=> this.removeToDo(todo)}
              hasCompleted={()=>this.hasCompleted(todo)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.props.todos.length}/>
          {this.hasCompleted() &&
            <ClearButton removeCompleted={this.removeCompleted}/>
          }
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  todos: []
};

App.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    todos: ToDos.find({}).fetch()
  };
}, App);
