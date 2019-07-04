// function User(username, email) {
//   this.username = username;
//   this.email = email;
// }

// User.prototype.changeEmail = function(newEmail) {
//   this.email = newEmail;
// }

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  static register(...args) {
    return new User(...args);
  }

  get foo() {
    return 'foo';
  }

  set foo(test) {
    return test;
  }

  changeEmail(newEmail) {
    this.email = newEmail;
  }
}

// const user = new User('john', 'johnslow01@gmail.com');
const user = User.register('john', 'johnslow01@gmail.com');

console.log(user);
user.changeEmail('johnsnow@gmail.com');
console.log(user);

function log(strategy) {
  strategy.handle();
}

class ConsoleLogger {
  handle() {
    console.log('Using the console strategy to log.');
  }
}

log(new ConsoleLogger);