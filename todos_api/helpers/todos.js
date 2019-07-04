var db = require('../models/index');

exports.getTodos = function(req, res, next) {
  db.Todo.find()
    .then(function(todos) {
      res.json(todos);
    })
    .catch(function(err) {
      res.send(err);
    });
}

exports.createTodo = function(req, res, next) {
  db.Todo.create(req.body)
    .then(function(newTodo) {
      res.status(201).json(newTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
}

exports.getTodo = function(req, res, next) {
  db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
      res.json(foundTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
}

exports.updateTodo = function(req, res, next) {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
    .then(function(updatedTodo) {
      res.json(updatedTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
}

exports.deleteTodo = function(req, res, next) {
  db.Todo.findOneAndRemove({ _id: req.params.todoId })
    .then(function(removedTodo) {
      res.json({ message: ' We deleted it!' });
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = exports;