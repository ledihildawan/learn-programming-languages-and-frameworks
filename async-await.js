// Callback Example

function endpointHandler(request, response) {
  User.findById(request.userId, function(err, user) {
    if (err) {
      response.send(err);
    } else {
      Tasks.findById(user.taskId, function(err, tasks) {
        if (err) {
          return response.send(err);
        } else {
          tasks.completed = true;
          tasks.save(function(err) {
            if (err) {
              return response.send(err)
            } else {
              response.send('Tasks completed');
            }
          });
        }
      });
    }
  });
}

// Promises Example
function endpointHandler(request, response) {
  User.findById(request.userId)
    .then(function (user) {
      return Tasks.findById(user.taskId);
    })
    .then(function (tasks) {
      tasks.completed = true;
      return tasks.save();
    })
    .then(function () {
      response.send('Tasks completed');
    })
    .catch(function (errors) {
      response.send(errors);
    });
}

// Async/Await Example
async function endpointHandler(request, response) {
  try {
    var user = await User.findById(request.userId);
    var tasks = await Tasks.findById(user.tasksId);
    tasks.completed = true;
    await tasks.save();
    response.send('Tasks completed');
  } catch(error) {
    response.send(error);
  }
}