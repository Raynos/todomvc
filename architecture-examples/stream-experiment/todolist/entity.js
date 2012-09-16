var map = require("lazy-map-stream")
    , uuid = require("node-uuid")
    , forEach = require("forEach-stream")
    , events = require("events-stream")
    , method = require("method-iterator")

module.exports = Entity

function Entity(doc, titles) {
    var set = doc.createSet("type", "todo")
        , addToDoc = doc.add.bind(doc)

    createFromTitle(titles)

    return events(set, "add")

    function createFromTitle(titles) {
        var rows = map(titles, createTodo)

        forEach(rows, addToDoc)
    }
}

function createTodo(title) {
    return {
        type: "todo"
        , title: title
        , id: uuid()
        , completed: false
    }
}

    /*

    function updateCompleted(toggles) {
        forEach(toggles, function (data) {
            var row = data.row
                , completed = row.get("completed")

            completed = !completed
            row.set("completed", completed)
        })
    }

    function updateTitle(edits) {
        forEach(edits, function (data) {
            var title = data.title
                , row = data.row

            row.set("title", title)
        })
    }

    function destroyTodo(destroys) {
        forEach(destroys, function (data) {
            var row = data.row

            row.set("__delete__", true)
        })
    }*/