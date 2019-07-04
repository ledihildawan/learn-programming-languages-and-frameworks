$(document).ready(function() {
  $.getJSON('/api/todos').then(addTodos);

  $('#todoInput').keypress(function(e) {
    if (e.which === 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
  });

  $('.list').on('click', 'span', function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

function addTodos(todos) {
  // add todos to page here
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var newTodo = $('<li>' + todo.name + ' <span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

function createTodo() {
  // send request to create new todo
  // '/api/todos'
  var usrInput = $('#todoInput').val();
  $.post('/api/todos', { name: usrInput })
  .then(function(newTodo) {
    addTodo(newTodo);
    $('#todoInput').val('');
  })
  .catch(function(err) {
    console.log(err);
  });
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  $.ajax({ url: deleteUrl, method: 'DELETE' })
  .then(function(data) {
    todo.remove();
  });
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = { completed: isDone };
  $.ajax({ url: updateUrl, method: 'PUT',  data: updateData })
  .then(function(updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  });
}