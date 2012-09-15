var map = require("lazy-map-stream")
    , forEach = require("forEach-stream")
    , flatten = require("flatten-stream")
    , Element = require("fragment").Element
    , unpack = require("unpack-element")
    , events = require("events-stream")
    , todoHtml = require("./todo.html")
    , compose = require("composite")
    , remove = require("dom-insert").remove
    , classList = require("dom-classList")
    , partialRight = require("ap").partialRight

module.exports = RenderTodos

function RenderTodos(todos) {
    var todoEls = map(todos, renderTodo)
        , toggles = expand(todoEls, eventOnElement("toggle", "click"))
        , destroys = expand(todoEls, eventOnElement("destroy", "click"))
        , editEvents = expand(todoEls, eventOnElement("edit", "keyup"))
        , edits = map(editEvents, extractTitle)

    forEach(todoEls, listenOnChange)

    return {
        toggles: toggles
        , destroys: destroys
        , edits: edits
    }
}

function renderTodo(row) {
    var elem = Element(todoHtml)
        , elements = unpack(elem)
        , state = row.get()

    setTitle(elements, state.title)

    return {
        elem: elem
        , elements: elements
        , row: row
    }
}

function setTitle(elements, title) {
    elements.text.textContent = title
    elements.edit.value = title
}

function eventOnElement(elemName, eventName) {
    return iterator

    function iterator(data) {
        var elem = data.elements[elemName]

        return map(events(elem, eventName), toEventRow)

        function toEventRow(event) {
            return {
                event: event
                , row: data.row
            }
        }
    }
}

function extractTitle(data) {
    return {
        row: data.row
        , title: data.event.target.value
    }
}

function listenOnChange(data) {
    var changes = events(data.row, "change")
        , elements = data.elements

    forEach(changes, updateElem)

    function updateElem(changes) {
        if (changes.title) {
            setTitle(elements, changes.title)
        }

        if ("done" in changes) {
            classList(elements.root).toggle("completed")
        }

        if (changes.__delete__) {
            remove(elements.root)
            changes.end()
            changes = null
        }
    }
}

function expand(stream, iterator) {
    return flatten(map(stream, iterator))
}

function prop(propertyName) {
    return iterator

    function iterator(item) {
        return item[propertyName]
    }
}