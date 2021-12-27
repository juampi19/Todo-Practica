import { Todo } from "../class";
import { todoList } from '../index';
//Referencias
const htmlUl            = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');


export const crearTodo = ( todo ) => {
    const htmlTodo = `
            <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
				<div class="view">
					<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
					<label>${ todo.tarea }</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" value="Create a TodoMVC template">
			</li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    htmlUl.appendChild(div.firstElementChild);

    return div.firstElementChild
}
//Eventos
txtInput.addEventListener('keyup', ( event ) => {
    
    if ( event.keyCode === 13 && txtInput.value.length > 0 ){
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        
        crearTodo( nuevoTodo );
        txtInput.value = '';
    }
})

htmlUl.addEventListener('click', (event) => {
    
   const nombreElemento =  event.target.localName;// Puede hacer input, label o boton
   const todoElemento = event.target.parentElement.parentElement;
   const todoId = todoElemento.getAttribute('data-id');
   
   if( nombreElemento.includes('input') ){ //Click en el check
        todoList.ToggleTodo(todoId);
        todoElemento.classList.toggle('completed');

   } else if( nombreElemento.includes('button') ){//Borrar el elemento
        todoList.eliminarTodo(todoId);
        todoElemento.remove();
   }


}); 

borrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();
    const completados = document.querySelectorAll('.completed');

    for (const completado of completados) {
        completado.remove();
    }
    
});


ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if( !filtro ) {return;} 

    anchorFiltros.forEach( element =>element.classList.remove('selected') )
    event.target.classList.add('selected');
    for( const elemento of htmlUl.children ) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add( 'hidden' );
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }    
        }
    }
});

