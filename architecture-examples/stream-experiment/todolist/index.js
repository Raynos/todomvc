var Elements = require("./elements")
    , Titles = require("./titles")
    , Entity = require("./entity")
    , prepend = require("dom-insert").prepend
    , RenderTodos = require("./render")

module.exports = TodoList

function TodoList(parentElement, doc) {
    var elems = Elements()
        , titles = Titles(elems.elements.newTodo)
        , entity = Entity(doc)
        , renderTodos = RenderTodos(entity.todos)

    prepend(parentElement, elems.root)

    entity.createFromTitle(titles)

}