// Objects are reference types
// All objects in JavaScript by default have a prototype
// Each object has a private property which holds a link to another object called its prototype
// When an inherited function is executed, the value of this points to the inheriting object, not to the prototype object where the function is an own property.
// All functions have a special property named prototype.
// this simply by default refrence to it self,  is the global object. In an object we can refer to the object it self when using this.
// A "constructor" in JavaScript is "just" a function that happens to be called with the new operator.
// In the constuctor we refering to our <nameObject> when using this
// We can now use the new operator to create an instance of Object
// Constructor function allow us create an object with some default fields and values
// Prototype allow us to inherit from object so they are on differen level
// this always refers to the left part of the dot which executing something where this is included
// bind can use letter because it's not call instantly
// call instantly call the method its own
// apply it generally works exactly same as call but passes arguments with arrays
// Object.defineProperty, The static method Object.defineProperty() defines a new property directly on an object, or modifies an existing property on an object, and returns the object.

// 1
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

// 2
function Person() {
  this.name = "ledi";
}
Person.prototype.name = "messi";

Person.prototype.greet = function() {
  console.log("Hello I am " + this.name);
}

var ryan = new Person();
ryan.name = "ryan";
ryan.greet(); // "Hello I am ryan"

var ledi = new Person();
ledi.greet(); // "Hello I am ledi"

console.log(ryan.__proto__ == Person.prototype); // true
console.log(ledi instanceof Person); // true

// 3
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var messi = new Person("messi", 32);
var cristiano = new Person("cristiano", 34);

console.log(messi); // {name: "messi", age; 32}
console.log(cristiano); // {name: "cristiano", age; 34}

// 4
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

// 5
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

// 6
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