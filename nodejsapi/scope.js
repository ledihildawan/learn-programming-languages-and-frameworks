// 1
var test = "Global Scope";

function localScope() {
  var test = "Local Scope";
  console.log(test);
}

localScope(); // "Local Scope"
console.log(test); // "Global Scope"

// 2
function localScope() {
  var test = "Local Scope";
  console.log(test);
}

localScope(); // "Local Scope"
console.log(test); // Uncaught ReferenceError...

// 3
function localScope() {
  test = "Local Scope";
  console.log(test);
}

localScope(); // "Local Scope"
console.log(test); // "Local Scope"

// The if statement executes a statement if a specified condition is truthy. If the condition is falsy, another statement can be executed.

var todos;
var completedTodos;

var http = new XMLHttpRequest();
var url = "https://jsonplaceholder.typicode.com/todos";
var method = "GET";

http.open(method, url);

http.addEventListener("readystatechange", function() {
  if (http.readyState === 4 && http.status === 200) {
    var data = JSON.parse(this.responseText);
    todos = data;
  } else if (http.readyState === 4 && http.status !== 200) {
    console.log("Error");
  }
});

http.send();

setTimeout(function() {
  completedTodos = todos.filter(function(todo) {
    if (todo.completed) {
      return todo;
    }
  });
  console.log(completedTodos);
}, 4000);