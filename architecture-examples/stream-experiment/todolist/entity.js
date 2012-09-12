var to = require("write-stream")
    , map = require("lazy-map-stream")
    , uuid = require("node-uuid")

module.exports = Entity

function Entity(doc) {
    var set = doc.createSet("type", "todo")
        , addToDoc = to(doc.add.bind(doc))

    return {
        createFromTitle: createFromTitle
    }

    function createFromTitle(titles) {
        var rows = map(titles, createTodo)

        rows.pipe(addToDoc)

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

function createFromTitle(set) {
    var saveRows = intoSet(set)
        , rows = map(saveRows, toRow)


    function toRow(title) {

    }
}

function intoSet(set) {
    return to(save)

    function save(row) {
        set.add(row)
    }
}