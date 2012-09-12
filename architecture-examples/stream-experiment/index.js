var ENTER = 13
    , events = require("events-stream")
    , filter = require("lazy-filter-stream")
    , map = require("lazy-map-stream")
    , uuid = require("node-uuid")
    , duplex = require("duplexer")
    , crdt = require("crdt")
    , to = require("write-stream")

var todos = TodoListView(document.getElementById("new-todo"))
    , todoSet = new crdt.Set()

function TodoListView(elem) {
    var presses = events(elem, "keypress")
        , enters = filter(presses, isEnter)
        , textFields = map(enters, prop("target"))
        , titles = map(textFields, prop("value"))
        , validTitles = filter(titles, isTruthy)
        , todos = map(validTitles, createTodo)

    forEach(textFields, clearField)

    return duplex(todos, null)

    function isEnter(event) {
        return event.keyCode === ENTER
    }

    function createTodo(title) {
        return {
            id: uuid()
            , title: title
            , done: false
        }
    }

    function clearField(field) {
        field.value = ""
    }
}

function forEach(stream, iterator) {
    return stream.pipe(to(iterator))
}

function isTruthy(item) {
    return !!item
}

function prop(propertyName) {
    return getProperty

    function getProperty(item) {
        return item[propertyName]
    }
}

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