var events = require("events-stream")
    , filter = require("lazy-filter-stream")
    , map = require("lazy-map-stream")
    , uuid = require("node-uuid")
    , duplex = require("duplexer")
    , to = require("write-stream")
    , ENTER = 13

module.exports = Titles

function Titles(newTodoField) {
    var presses = events(newTodoField, "keypress")
        , enters = filter(presses, isEnter)
        , textFields = map(enters, prop("target"))
        , titles = map(textFields, prop("value"))
        , validTitles = filter(titles, isTruthy)

    forEach(textFields, clearField)

    return validTitles

    function isEnter(event) {
        return event.keyCode === ENTER
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