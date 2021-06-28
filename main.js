const name_input = document.querySelector(".name")
const description_input = document.querySelector(".description")
const add_btn = document.querySelector(".button_add")

const list = document.querySelector(".todo_container")

let todos = []

add_btn.addEventListener('click', (e) => {
    if (name_input.value && description_input.value) {
        createTodo(name_input.value, description_input.value);

        name_input.value = ""
        description_input.value = ""
    } else {
        alert("Put all data inside inputs")
    }
})

function createTodo(name, description) {
    let todo = {
        name: name,
        description: description,
        done: false,
        id: Math.random()
    }
    todos.push(todo)

    renderList()
}

function renderList() {
    list.innerHTML = ''

    todos.map(t => {
        let todoContainer = document.createElement('div')
        let todo = document.createElement('li')

        const remove_btn = document.createElement('div')
        remove_btn.innerText = "Remove"
        remove_btn.classList.add('button_remove')
        remove_btn.addEventListener('click', e => {
            removeTodo(t)
        })

        const edit_btn = document.createElement('div')
        edit_btn.innerText = "Edit"
        edit_btn.classList.add('button_edit')
        edit_btn.addEventListener('click', e => {
            editTodo(t)
        })

        todo.classList.add('todo')
        todo.innerText = `${t.name}: ${t.description}`;
        if (t.done === true) {
            todo.style.textDecoration = "line-through"
        } else todo.style.textDecoration = "none"

        todo.addEventListener('click', e => {
            resolveTodo(t)
        })
        todoContainer.appendChild(todo)
        todoContainer.appendChild(remove_btn)
        todoContainer.appendChild(edit_btn)
        list.appendChild(todoContainer)
    })
}

function resolveTodo(todo) {
    todos.map(t => {
        if (t.id === todo.id) {
            t.done = !t.done
        }
    })

    renderList()
}

function removeTodo(todo) {
    todos = todos.filter((item) => item.id !== todo.id)

    renderList()
}
function editTodo(todo) {


    renderList()
}