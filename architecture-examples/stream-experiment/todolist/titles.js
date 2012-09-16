var events = require("events-stream")
    , filter = require("lazy-filter-stream")
    , forEach = require("forEach-stream")
    , map = require("lazy-map-stream")
    , compose = require("composite")
    , pluck = require("pluck-stream")
    , prop = require("prop-iterator")
    , method = require("method-iterator")
    , isTruthy = require("is-truthy")
    , ENTER = 13

module.exports = Titles

function Titles(newTodoField) {
    var presses = events(newTodoField, "keypress")
        , enters = filter(presses, isEnter)
        , textFields = pluck(enters, "target")
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