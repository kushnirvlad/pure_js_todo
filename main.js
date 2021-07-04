const name_input = document.querySelector(".name")
const description_input = document.querySelector(".description")
const add_btn = document.querySelector(".button_add")

const list = document.querySelector(".todo_wrapper")

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
        todoContainer.classList.add('todo_container')
        let todo = document.createElement('li')


        let buttons_container = document.createElement('div')
        buttons_container.classList.add("buttons_container")

        const remove_btn = document.createElement('div')
        remove_btn.innerText = "Remove"
        remove_btn.classList.add('button')
        remove_btn.classList.add('button_remove')
        remove_btn.addEventListener('click', e => {
            removeTodo(t)
        })

        const edit_btn = document.createElement('div')
        edit_btn.innerText = "Edit"
        edit_btn.classList.add('button')
        edit_btn.classList.add('button_edit')
        edit_btn.addEventListener('click', e => {
            editTodo(t, e)
        })


        todo.classList.add('todo')
        let label = document.createElement('label');
        label.innerText = `${t.name}: ${t.description}`;

        todo.appendChild(label)
        todo.setAttribute('data-key', `${t.id}`);
        if (t.done === true) {
            label.style.textDecoration = "line-through"
        } else label.style.textDecoration = "none"

        label.addEventListener('click', e => {
            resolveTodo(t)
        })

        let name_input = document.createElement('input')
        name_input.setAttribute('type', 'text');
        name_input.style.display = 'none'
        name_input.classList.add('editInput')

        let description_input = document.createElement('input')
        description_input.setAttribute('type', 'text');
        description_input.style.display = 'none'
        description_input.classList.add('editInput')

        todo.appendChild(name_input)
        todo.appendChild(description_input)

        todo.appendChild(remove_btn)
        todo.appendChild(edit_btn)

        todoContainer.appendChild(todo)


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

function editTodo(t, e) {
    let editButton = e.target;


    let todo = editButton.parentNode;

    let label = todo.querySelector('label');
    let inputs = todo.querySelectorAll('input[type=text]');

    let labelText = label.textContent.split(":")

    let name = labelText[0];
    let description = labelText[1].replace(/\s/g, "");

    let containsClass = todo.classList.contains('editMode');

    if (containsClass) {
        label.style.display = "flex"
        todos.map(td => {
            console.log(td.name, td.description)
            if (td.id === t.id) {
                td.name = inputs[0].value
                td.description = inputs[1].value
            }
        })
        renderList()
    } else {
        label.style.display = "none"
        inputs.forEach((input)=>{
            input.style.display = "inline-flex"
        })
        inputs[0].value = name;
        inputs[1].value = description
    }

    todo.classList.toggle('editMode');
}