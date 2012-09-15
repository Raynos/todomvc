var events = require("events-stream")
    , filter = require("lazy-filter-stream")
    , forEach = require("forEach-stream")
    , map = require("lazy-map-stream")
    , compose = require("composite")
    , ENTER = 13

module.exports = Titles

function Titles(newTodoField) {
    var presses = events(newTodoField, "keypress")
        , enters = filter(presses, isEnter)
        , textFields = map(enters, prop("target"))
        , titles = map(textFields, compose(method("trim"), prop("value")))
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

function isTruthy(item) {
    return !!item
}

function prop(propertyName) {
    return getProperty

    function getProperty(item) {
        return item[propertyName]
    }
}

function method(propertyName) {
    return callMethod

    function callMethod(item) {
        return item[propertyName]()
    }
}