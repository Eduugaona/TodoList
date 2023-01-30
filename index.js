const button = document.getElementById("create-button");
const input = document.getElementById("input")
const Todos = document.querySelector("#Todos")
const deletButton = document.getElementById("task-button")
const taskList = document.querySelector(".task-list")
const deleteAllButton = document.getElementById("button-delete-all")
const modal = document.getElementById("modal")
const emptyMsg = document.getElementById("empty-msg")
const completeTodo = document.getElementById("complete-todo")
const listTodo = document.getElementById("list-todo")

let id = 0;

let ListTodos = JSON.parse(localStorage.getItem('todoList')) || [];


let saveToLocalStorage = (task) => {
    localStorage.setItem("todoList",JSON.stringify(task))}




const InputValue = (e) => {
    e.preventDefault();
    todoItem()
    
}
    const todoItem = () => {

        const taskName = input.value.toUpperCase();
        console.log(taskName)
        if (taskName === '') {
            showError('No escribiste ninguna tarea')
            return;
        }
        else if (ListTodos.some((task) => task.task === taskName)) {
            errorMesagge() 
            return;
        }
        else{
        const todoObj = {task : taskName ,
             todoId: id + 1,
            completed: false}

        ListTodos = [...ListTodos , todoObj]  

        saveToLocalStorage(ListTodos)

        id = id +1

        input.value = "";    
  
        renderTodos()
        actualizar()    }
    }


    const actualizar = () => {
        renderTodos()
        showDeleteAllButton()
    }

    


const renderTodos = () => {
    reset()
    if (ListTodos.length > 0) {
        ListTodos.forEach(task => {
            const li = document.createElement('li');
            li.classList.add( task.completed ? 'checked' : 'list-todo')   
            li.innerHTML = `${task.task}<div class="buttons-container"> <i class="fa-regular fa-circle-check complete-task" id="complete-todo" data-set=${task.todoId}></i> <i class="fa-regular fa-trash-can delete-button" id="todo-button"  data-set=${task.todoId}></i></div>`

            Todos.appendChild(li)
            
            
        })
    }

    
}


const reset = () => {
    Todos.innerHTML = '';
}

const showError = (error) => {
    console.log(error)
}

const deleteTodo = (e) => {
    if (!e.target.classList.contains("delete-button")){
        return
    }
    
    const idd =  +e.target.dataset.set;
    console.log(typeof(idd))
    if (confirm("Desea borrar esta tarea") === true) {
    ListTodos = ListTodos.filter( (task) => task.todoId !== idd)
    saveToLocalStorage(ListTodos)
    actualizar()
    }
}

const taskComplete = (e) => {
    if (!e.target.classList.contains("complete-task")){
        return
    }else{
        const idd =  +e.target.dataset.set;
         ListTodos.map((task) => {
            if(task.todoId == idd){
                task.completed = !task.completed
                saveToLocalStorage(ListTodos)
                actualizar()
            }
        })
}}




const deleteAll = () => {
    ListTodos = [];
    saveToLocalStorage(ListTodos)
    actualizar()
}

const errorMesagge = () => {
    modal.classList.toggle("toggle-modal")
    setTimeout(() => {
    modal.classList.toggle("toggle-modal")
    }, 1500);
}

const showDeleteAllButton = () => {
    if (ListTodos.length > 0) {
        deleteAllButton.classList.remove("delete-all_hidden")
        emptyMsg.classList.add("initial-msg-hidden")
    } else {
        deleteAllButton.classList.add("delete-all_hidden")
        emptyMsg.classList.remove("initial-msg-hidden")
    }
}






const init = () => {
actualizar()
button.addEventListener("click", InputValue)
taskList.addEventListener("click", deleteTodo)
taskList.addEventListener("click", taskComplete)
deleteAllButton.addEventListener("click" , deleteAll)
}

init()
