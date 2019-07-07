// 1
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.greeting = function () {
  return `Hello there ${this.firstName} ${this.lastName}`;
};

const ledi = new Person('ledi', 'hildawan', 22);

function Customer(firstName, lastName, phone, membership) {
  Person.call(this, firstName, lastName);

  this.phone = phone;
  this.membership = membership;
}

// Inherit prototype from Person
Customer.prototype = Object.create(Person.prototype);
Customer.prototype.consturctor = Customer;

Customer.prototype.greeting = function () {
  return `Hello there ${this.firstName} ${this.lastName} welcome to our company`;
}

const joko = new Customer('joko', 'permono', '1234567890', 'premium');

// 2
class Team {
  constructor(name) {
    this.name = name;
  }
}

class HockyTeam extends Team {
  constructor(name) {
    super(name);
    
    this.type = "Hockey";
  }

  scoreGoal() {
    console.log("he shoots, he scores");
  }
}

const wings = new HockyTeam('Red Wings');

console.log(wings.name);
wings.scoreGoal();