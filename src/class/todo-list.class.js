import { Todo } from ".";

export class TodoList {

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
      this.todos =  this.todos.filter(todo => {
            return todo.id != id
        });

        this.guardarLocalStorage();
    }

    ToggleTodo( id ) {
        
        for(const todo of this.todos){
            
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            } 
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => {
            return todo.completado === false});
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos) );
    }

    cargarLocalStorage(){
        
        this.todos = (localStorage.getItem('todo')) ? this.todos = JSON.parse(localStorage.getItem('todo')) : this.todos = [];
        
        this.todos = this.todos.map(todo => {
            return Todo.fromJson( todo );
        })
    }
}