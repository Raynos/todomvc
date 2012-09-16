module.exports = renderTodo

function renderTodo(row) {
    var elem = Element(todoHtml)
        , elements = unpack(elem)
        , state = row.get()

    setTitle(elements, state.title)

    if (state.completed) {
        classList(elements.root).add("completed")
    }

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



function listenOnChange(data) {
    var changes = events(data.row, "change")
        , elements = data.elements

    forEach(changes, updateElem)

    function updateElem(changes) {
        if (changes.title) {
            setTitle(elements, changes.title)
        }

        if ("completed" in changes) {
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