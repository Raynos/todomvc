// A DOM output
var Elements = require("./elements")
    // A DOM input
    , Titles = require("./titles")
    // A state input & state output
    , Entity = require("./entity")

module.exports = TodoList

function TodoList(doc) {
    // Create the DOM elements for the TodoList (Template)
    var elements = Elements()
        // Create a stream of new titles (Input part of view)
        , titles = Titles(elements.newTodo)
        // Create the entity for the TodoList (Model)
        , entity = Entity(doc, titles)

    // Make sure we create todo entities from the new titles
    entity.createFromTitle(titles)

    // Create Todo items for each todo structure and make sure they are
    // Appended to the element list
    elements.appendTodos(entity.todos)

    return elements
}