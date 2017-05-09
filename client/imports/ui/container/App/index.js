import React, { Component } from 'react';
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
    let newTodos = this.state.todos.map((todo) => {
      item.id === todo.id ? todo.complete = !todo.complete : todo.complete;
      return todo;
    });
    this.setState({
      todos: newTodos
    })
  }

  removeToDo (item) {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== item.id;
    });
    this.setState({
      todos: newTodos
    })
  }

  removeCompleted() {
    let todos = this.state.todos.filter((todo) => !todo.complete);
    this.setState({ todos });
  }

  hasCompleted(item) {
    let completedTodos = this.state.todos.filter((todo) => todo.complete);
    if (completedTodos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addToDo (event) {
    event.preventDefault();

    if(this.state.inputValue) {
      const id = this.state.lastId +1;
      const newTodos = this.state.todos.concat({
        id,
        title: this.state.inputValue,
        complete: false
      });
      this.setState({
        todos: newTodos,
        lastId: id
      });
      this.setState({inputValue: ''});
    }
  }

  onInputChange(event) {
    // event.preventDefault();
    this.setState({inputValue: event.target.value})
  }

  componentDidMount() {
    this.toDoInput.focus()
  }

  // <input type="text" ref={(input) => (this.toDoInput = input)} />

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
          {this.state.todos.map((todo, i) => (
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
          <ToDoCount number={this.state.todos.length}/>
          {this.hasCompleted() &&
            <ClearButton removeCompleted={this.removeCompleted}/>
          }
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    complete: PropTypes.bool
  }).isRequired,
  toggleComplete : PropTypes.func.isRequired
};

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default App;
