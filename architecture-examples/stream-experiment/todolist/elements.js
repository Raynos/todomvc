var html = require("todolist.html")
    , Element = require("fragment").Element
    , unpack = require("unpack-element")

module.exports = Widget

function Widget() {
    var rootElem = Element(html)
        , elements = unpack(rootElem)

    return {
        root: rootElem
        , elements: elements
    }
}