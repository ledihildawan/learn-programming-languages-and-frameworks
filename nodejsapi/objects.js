// Objects are reference types
// All objects in JavaScript by default have a prototype
// Prototype
// Prototype chain?
// Object.prototype
// Obj.__proto__
// this simply by default refrence to it self,  is the global object. In an object we can refer to the object it self when using this.
// In the constuctor we refering to our <nameObject> when using this
// Constructor function allow us create an object with some default fields and values
// Prototype allow us to inherit from object so they are on differen level
// this always refers to the left part of the dot which executing something where this is included
// bind can use letter because it's not call instantly
// call instantly call the method its own
// apply it generally works exactly same as call but passes arguments with arrays
// Object.defineProperty

var person = {
  name: "john",
  age: 40,
  details: {
    location: "singapore",
  }
};

Object.prototype.greet = function() {
  return "Hello I am " + this.name + ".";
};

console.log(person.greet()); // "Hello I am john."
person.name = "mark";
console.log(person.name); // "mark"

var anotherPerson = new Object(person);

var thirdPerson = Object.create(person);
console.log(Object.getPrototypeOf(thirdPerson) == person); // true
thirdPerson.name = "jack";
console.log(thirdPerson.greet()); // "Hello I am jack".
console.log(thirdPerson.name); // "jack"

//
function Person() {
  this.name = "ledi";
}

Person.prototype.name = "messi";

Person.prototype.greet = function() {
  console.log("Hello I am " + this.name);
}

var ryan = new Person();
ryan.name = "ryan";
ryan.greet();

var ledi = new Person();
ledi.greet();

console.log(ryan.__proto__ == Person.prototype);
console.log(ledi instanceof Person);

// 4
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var messi = new Person("messi", 32);
var cristiano = new Person("cristiano", 34);

// 6
function fn(message) {
  console.log(message + this);
}

fn("holla"); // window

const obj = {
  objfn: fn
};

var person = {
  name: "jovic"
};

obj.objfn("ready"); // obj

obj.objfn.bind(this, 'ping')(); // window
obj.objfn.call(person, 'test'); // person
obj.objfn.apply(person, ['knock knock']); // person

// 6
var account = {
  _name: "john",
  _cash: 999999999
};

Object.defineProperty(account, "name", {
  get: function() {
    return this._name;
  },
  set: function(name) {
    this._name = name;
  }
});

Object.defineProperty(account, "member", {
  value: "premium",
  writable: true
});

console.log(account.name);
account.name = "mark";
console.log(account.name);
console.log(account.member);
account.member = "basic";
console.log(account.member);

// 10
var person = {
  name: "lee",
  age: 46
};

delete person.age;
console.log(person.age);
console.log("name" in person);

for (var field in person) {
  console.log(field + ":" + person[field]);
}