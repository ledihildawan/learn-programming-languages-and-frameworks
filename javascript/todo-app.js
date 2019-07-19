var todos = [
  'clean room',
  'buy milk',
  'study javascript',
  'exercie',
  'eat healthy'
];

var todosLength = todos.length;

// for (var i = 0; i < todos.length; i++) {
//   todos.pop();
// }

function logTodos(todo, index) {
  console.log(todo, index);
}

todos.forEach(logTodos);

// var i = 0;

// while (i < todosLength) {
//   console.log(todos[i]);
//   i++;
// }

// do {
//   console.log(todos[i]);
//   i++;
// } while (i < todos.length);

