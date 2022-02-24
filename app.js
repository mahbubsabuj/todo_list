//
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

//
let itemNo = 0
let todoListItems = []

//

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', f)


function addTodo(event) {
    event.preventDefault()
    inputValue = todoInput.value
    if (inputValue.length) {
        itemNo += 1
        const todoObj = {
            id: itemNo,
            value: inputValue,
            done: false
        }
        todoListItems.push(todoObj)
        render()
    }
}


function render() {
    while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    for (let i = 0; i < todoListItems.length; ++i) {
        const todoDiv = document.createElement('div')
        todoDiv.setAttribute('id', todoListItems[i].id)
        todoDiv.classList.add('todo')
        if (todoInput.value.length === 0) {
            console.log("input is empty")
            return;
        }
        console.log(todoInput.value.length)
        //creating list
        const newTodo = document.createElement('li')
        newTodo.innerText = todoListItems[i].value

        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        //buttons
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
        completedButton.classList.add('complete-button')
        todoDiv.appendChild(completedButton)

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
        deleteButton.classList.add('delete-button')
        todoDiv.appendChild(deleteButton)

        const editButton = document.createElement('button')
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        editButton.classList.add('edit-button')
        todoDiv.appendChild(editButton)
        const doneButton = document.createElement('button')
        doneButton.innerHTML = '<i class="fa-solid fa-check-double"></i>'
        doneButton.classList.add('done-button')
        todoDiv.appendChild(doneButton)

        todoList.appendChild(todoDiv)
        if (todoListItems[i].done === true) {
            todoDiv.parentElement.classList.toggle('done')
        }
    }
    todoInput.value = "";
}

function remove(item, id) {
    item.parentElement.remove()
    todoListItems.splice(parseInt(id), 1);
    todoInput.text = ""
}
function complete(item, id) {
    item.parentElement.classList.toggle('done')
    if (todoListItems[parseInt(id)].done) {
        todoListItems[parseInt(id)].done = false
    } else {
        todoListItems[parseInt(id)] = true
    }
}

function editButton(event) {
    const value = event.target.parentElement.innerText
    todoInput.value = value
}

function doneButton(item, id) {
    if (todoInput.value.length > 0) {
        todoListItems[parseInt(id)].value = todoInput.value
        console.log("YES2")
        item.parentElement.innerText = todoInput.value
        render()
    }
}

function f(event) {
    const item = event.target;
    const id = item.parentElement.id
    if (item.classList[0] === 'delete-button') {
        remove(item, id)
    } else if (item.classList[0] === 'complete-button') {
        complete(item, id)
    } else if (item.classList[0] === 'edit-button') {
        editButton(event)
        console.log(item.parentElement.classList)
        console.log(event.target.parentElement.innerText)
    } else if (item.classList[0] === 'done-button') {
        doneButton(item, id)
    } else {
        console.log("text area pressed")
    }
}