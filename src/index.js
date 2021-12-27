import './app.css';
import {Todo, TodoList} from './class'
import { crearTodo } from './js/componentes';
// import { TodoList } from './class/todo-list.class';
// import { Todo } from './class/todo.class';

export const todoList = new TodoList();



todoList.todos.forEach(todo => crearTodo( todo ));
console.log('todos', todoList.todos);