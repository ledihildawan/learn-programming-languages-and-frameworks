var database = [
  { username: "john", password: "john123" },
  { username: "joko", password: "joko123" },
  { username: "ledi", password: "ledi123" }
];

var newsFeed = [
  {
    username: "rose",
    timeline: "Listening A Brand New Day. Zara Larsoon is amazing 🔥🔥🔥"
  },
  {
    username: "jack",
    timeline: "#GoT season 8 is the worst season finale ever!"
  },
  {
    username: "kevin",
    timeline: "Can't wait to play futsal tomorrow. 😁"
  }
];

var username = prompt("What's your username?");
var password = prompt("What's your password?");

function isUserFound(username) {
  for (var i = 0; i < database.length; i++) {
    if (username === database[i].username) {
      return true;
    }
  }

  return false;
}

function isValidUser(username, password) {
  for (var i = 0; i < database.length; i++) {
    if (username === database[i].username && password === database[i].password) {
      return true;
    }
  }

  return false;
}

function signIn(username, password) {
  if (isUserFound(username)) {
    if (isValidUser(username, password)) {
      return newsFeed;
    } else {
      return 'Wrong username or password';
    }
  }

  return 'Account not found!';
}

signIn(username, password);