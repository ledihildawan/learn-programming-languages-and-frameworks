/*
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person.prototype.calculateAge = function() {
  console.log(2019 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1991, 'Web Developer');
var jane = new Person('Jane', 1948, 'Designer');
var mike = new Person('Mike', 1958, 'Retired');

john.calculateAge();
jane.calculateAge();
mike.calculateAge();

console.log(john.lastName, jane.lastName, mike.lastName);
*/

// Create __proto__ with Object.create({});
var personProto = {
  calculateAge: function() {
    console.log(2016 - this.yearOfBirth);
  }
}

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
  name: { value: 'Jane' },
  yearOfBirth: { value: 1969 },
  job: { value: 'designer' }
});
