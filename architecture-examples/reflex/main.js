var state = require("reflex/state")
var channel = require("reducers/channel")
var reductions = require("reducers/reductions")
var reduce = require("reducers/reduce")
var emit = require("reducers/emit")
var writer = require("reflex/writer")
var diff = state.diff
var patch = state.patch

var appState = channel()

var todoList = collectionWriter(function swap(view, state) {
  console.log("swap", arguments)

  if ("title" in state) {
    view.querySelector("label").textContent = state.title
  }

  if ("completed" in state) {
    view.querySelector(".toggle").checked = state.completed
  }

  return view
}, function close(view, container) {
  container.removeChild(view)
}, function open(state, container) {
  var node = document.getElementById('template').cloneNode(true)
  node.hidden = false

  if (state.title) {
    node.querySelector("label").textContent = state.title
  }

  if (state.completed) {
    node.querySelector(".toggle").checked = state.completed
  }

  container.appendChild(node)

  return node
})

var appStream = reductions(appState, function (prevState, delta) {
  return patch(prevState, delta)
}, state())

var count = reductions(appStream, function (_, state) {
  console.log("count", state)
  return Object.keys(state).map(function (id) {
    return state[id].completed
  }).filter(function (v) {
    return !v
  }).length
})

writer(function swap(view, number) {
  console.log("state", arguments)
  view.textContent = number
})(count, document.querySelector("#todo-count"))

todoList(appStream, document.querySelector("#todo-list"))

window.appState = appState
window.emit = emit

function collectionWriter(swap, close, open) {
  var hash = {}

  return function write(input, seed) {
    reduce(input, function (acc, value) {
      var delta = diff(value)
      Object.keys(delta).forEach(function (id) {
        var item = delta[id]

        if (id in hash) {
          hash[id] = swap(hash[id], item)
        } else if (item === null) {
          close(hash[id], seed)
          hash[id] = null
        } else {
          hash[id] = open(item, seed)
        }
      })
    })
  }
}
