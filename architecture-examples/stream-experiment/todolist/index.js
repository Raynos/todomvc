var Elements = require("./elements")
    , Titles = require("./titles")
    , Entity = require("./entity")

module.exports = TodoList

function TodoList(parentElement, set) {
    var elems = Elements()
        , titles = Titles(elems.elements.newTodo)
        , entity = Entity(set)

    prepend(parentElement, elems.root)

    entity.createFromTitle(titles)
}

function prepend(parent, elem) {
    parent.insertBefore(elem, parent.firstChild)
}