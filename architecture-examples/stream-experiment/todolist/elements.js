var html = require("todolist.html")
    , Element = require("fragment").Element
    , unpack = require("unpack-element")
    , partial = require("ap").partial
    , map = require("lazy-map-stream")
    , forEach = require("forEach-stream")
    , append = require("insert").append
    , pluck = require("pluck-stream")

var Todo = require("../todo")

module.exports = Elements

function Elements() {
    var elements = unpack(Element(html))
    elements.appendTodos = appendTodos

    return elements

    function appendTodos(todos) {
        // Map all the todos coming out of the entity to a Todo representation
        var todoItems = map(todos, Todo)
            , todoEls = pluck(todoItems, "elements.root")

        // Make sure we append all the todo elements to the todoList
        forEach(todoEls, partial(append, elements.todoList))
    }
}