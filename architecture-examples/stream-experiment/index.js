var TodoList = require("./todolist")
    , crdt = require("crdt")

var todoDoc = new crdt.Doc()
    , body = document.body

TodoList(body, todoDoc)

/*
var presses = DOMEventStream(document.documentElement, "keypress")
    , enters = FilterStream(presses, function (event) {
        return event.keyCode === ENTER
    })
    , incomingTitles = MapStream(enters, function (event) {
        return event.target.value
    })
    , validTitles = FilterStream(incomingTitles, function (title) {
        return !!title
    })
    , newTodos = MapStream(validTitles, function (title) {
        return {
            cid: uuid()
            , title: title
            , done: false
        }
    })
    , newTodoEls = MapStream(newTodos, function (model) {
        var li = document.createElement("li")
            , view = document.createElement("div")
            , checkbox = document.createElement("input")
            , label = document.createElement("label")
            , destroyButton = document.createElement("button")
            , inputField = document.createElement("input")

        li.id = model.cid
        view.classList.add("view")
        checkbox.type = "checkbox"
        checkbox.classList.add("toggle")
        label.textContent = model.title
        destroyButton.classList.add("destroy")
        inputField.classList.add("edit")
        inputField.value = model.title

        li.appendChild(view)
        view.appendChild(checkbox)
        view.appendChild(label)
        view.appendChild(destroyButton)
        li.appendChild(inputField)

        return li
    })
    , todosEl = document.getElementById("todo-list")
    , count = ReduceStream(newTodos, function (acc, value) {
        return acc + 1
    }, 1)
    , todoCount = document.getElementById('todo-count')
    , toggleEvents = DOMEventStream(document.documentElement, "change")
    , toggleUpdates = MapStream(toggleEvents, function (event) {
        return {
            id: event.target.parentElement.parentElement.id
            , done: event.target.checked
        }
    })

newTodoEls.pipe(InsertBeforeStream(todosEl))

count.pipe(through(function (count) {
    todoCount.textContent = count + " items left"
}))

enters.pipe(through(function (event) {
    event.target.value = ""
}))

toggleUpdates.pipe(through(function (update) {
    var classList = document.getElementById(update.id).classList
    if (update.done) {
        classList.add("completed")
    } else {
        classList.remove("completed")
    }
}))*/