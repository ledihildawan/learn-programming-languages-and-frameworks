var database = [
  { username: "john", password: "john123" }
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

function signIn(username, password) {
  if (username === database[0].username && password === database[0].password) {
    return newsFeed;
  } else if (username === database[0].username || password === database[0].password) {
    return "Username or password doesn't match!";
  } else {
    return "account is not found";
  }
}

signIn(usernameInput, passwordInput);