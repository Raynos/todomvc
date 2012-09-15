var map = require("lazy-map-stream")
    , uuid = require("node-uuid")
    , forEach = require("forEach-stream")
    , events = require("events-stream")

module.exports = Entity

function Entity(doc) {
    var set = doc.createSet("type", "todo")
        , addToDoc = doc.add.bind(doc)

    return {
        createFromTitle: createFromTitle
        , todos: events(set, "add")
    }

    function createFromTitle(titles) {
        var rows = map(titles, createTodo)

        forEach(rows, addToDoc)

        function createTodo(title) {
            return {
                type: "todo"
                , title: title
                , id: uuid()
                , done: false
            }
        }
    }
}

function method(methodName) {
    return iterator

    function iterator(item) {
        return item[methodName]()
    }
}