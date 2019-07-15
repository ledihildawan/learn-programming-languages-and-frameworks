/*
// Variables
// Primitive Data Types
// String
var name = 'John';
var lastName = 'Smith';
// Numbers
var age = 26;
// Boolean
var fullAge = true;
// undefined
// null

var job, isMerried;

job = 'teacher';
isMerried = false;

age = 'thirty six';
job = 'driver';

// Operators
var now = 2019;
var birthYear = now - 22;

birthYear = now - 22 * 2;

var ageJohn = 30;
var ageMark = 30;

ageJohn = ageMark = (3 + 5) * 4 - 6;
// ageJohn = ageMark = 26
// ageJohn = 26
// ageMark = 26

ageJohn++; // 27
ageJohn += 1;
ageJohn = ageJohn + 1;

// if / else statements
var name = 'john';
var age = 26;
var isMerried = 'no';
var str = '';

if (isMerried === 'yes') {
  str = name + ' is marred!';
} else {
  str = name + ' will hopefully marry sonn :)';
}

isMerried = false;

if (isMerried) {
  str = 'YES!';
} else {
  str = 'NO!';
}

// Boolean logic and switch
var age = 16;
var str = '';

if (age < 20) {
  str = 'John is a teenager';
} else if (age >= 20 && age < 30) {
  str = 'John is a young man.';
} else {
  str = 'John is a man.';
}

var job = 'teacher';

job = prompt('What does john do?');

switch (job) {
  case 'teacher':
    str = 'John teaches kids.';
    break;
  case 'driver':
    str = 'John drives a cab in Lisbon';
    break;
  case 'cop':
    str = 'John helps fight crime.';
    break;
  default:
    str = 'John does something else';
}

// Conding Challange 1
var johnAge = 20;
var johnHeight = 169;
var johnScore = (johnHeight + 5) * johnAge;
var friendAge = 20;
var friendHeight = 169;
var friendScore = (friendHeight + 5) * friendAge;
var friend2Age = 20;
var friend2Height = 169;
var friend2Score = (friend2Height + 5) * friend2Age;

if (johnScore > friendScore && johnScore > friend2Score) {
  console.log('John wins with score ' + johnScore + ' pt.');
} else if (friendScore > johnScore && friendScore > friend2Score) {
  console.log('Friend wins with score ' + friendScore + ' pt.');
} else if (friend2Score > johnScore && friend2Score > friendScore) {
  console.log('Friend2 wins with score ' + friend2Score + ' pt.');
} else {
  console.log('It is a draw.');
}

// Functions
function calculateAge(yearOfBirth) {
  var age = 2019 - yearOfBirth;
  return age;
}

var ageJohn = calculateAge(1990);
var ageMary = calculateAge(1969);
var ageMake = calculateAge(1948);

function yearsUntilRetirement(name, year) {
  var age = calculateAge(year);
  var retirement = 65 - age

  if (retirement >= 0) {
    console.log(name + ' retires in ' + retirement + ' years.');
  } else {
    console.log(name + ' is already retired.');
  }
}

yearsUntilRetirement('John', 1990);
yearsUntilRetirement('Mike', 1946);
yearsUntilRetirement('John', 1964);

function someFun(par) {
  // code
}

var someFun = function(par) {
  // code
}

// Expression
3 + 4;
var x = 3;

// Statements
if (x === 5) {
  // do something
}

// Arrays
var names = ['John', 'Jan', 'Mark'];
var years = new Array(1999, 1969, 1948);

console.log(names[2]);
names[1] = 'Ben';
console.log(names);

var john = ['John', 'Smith', 1990, 'Designer', false];

john.push('blue');
john.unshift('Mr.');
john.pop();
john.shift();
console.log(john);

if (john.indexOf('Teacher') === -1) {
  console.log('John is NOT a teacher.');
}

// Objects and methodds
var john = {
  name: 'John',
  lastName: 'Smith',
  yearOfBirth: 1990,
  job: 'teacher',
  isMerried: false,
  family: ['Jane', 'Mark', 'Bob'],
  calculateAge: function() {
    // return 2019 - this.yearOfBirth;
    this.age = 2019 - this.yearOfBirth;
  }
}

console.log(john.name);
console.log(john['lastName'])
console.log(john.calculateAge());

// var age = john.calculateAge();
// john.age = age;

john.calculateAge();

var xyz = 'job';
console.log(john[xyz])

john.lastName = 'Miller';
john['job'] = 'programmer';

console.log(john);

var jane = new Object();

jane.name = 'Jane';
jane.lastName = 'Smith';
jane['yearOfBirth'] = 1969;
jane['job'] = 'retired';
jane['isMerried'] = true;

// console.log(jane);

// Loops
for (var i = 0; i < 10; i++) {
  console.log(i);
}

// 0; true; print 0; update i to 1;
// 1; true; print 1; update i to 2;
// ...
// 9; true; print 9; update i to 10;
// 10; false; end loop!

var names = ['john', 'jane', 'mary', 'mark', 'bob'];

for (var i = 0; i < names.length; i++) {
  console.log(names[i]);
}

for (var i = names.length - 1; i >= 0; i--) {
  console.log(names[i]);
}

var i = 0;

while (i < names.length) {
  console.log(names[i]);
  i++;
}

// Coding Challange 2
var yearsOfBorn = [1965, 2008, 1992];
var yearsOfBorn2 = [1999, 2008, 2017];

function printFullAge(years) {
  var fullAge = [];

  for (var i = 0; i < years.length; i++) {
    if (2019 - years[i] >= 18) {
      fullAge.push(true);
    } else {
      fullAge.push(false);
    }
  }

  return fullAge;
}

console.log(printFullAge(yearsOfBorn));
console.log(printFullAge(yearsOfBorn2));

// Conding Challange 2 - Solution
function printFullAge(years) {
  var ages = [];
  var fullAges = [];

  for (var i = 0; i < years.length; i++) {
    // ages.push(2019 - years[i])
    ages[i] = 2019 - years[i];
  }

  for (var i = 0; i < ages.length; i++) {
    if (ages[i] >= 18) {
      console.log('Person ' + (i + 1) + ' is ' + ages[i] + ' years old, and is of full age.');
      fullAges.push(true);
    } else {
      console.log('Person ' + (i + 1) + ' is ' + ages[i] + ' years old, and is NOT of full age.');
      fullAges.push(false);
    }
  }

  return fullAges;
}

var full_1 = printFullAge([1965, 2008, 1992]);
var full_2 = printFullAge([1999, 2008, 2017]);

console.log(full_1);
console.log(full_2);

// Hoisting - function
calculateAge(1890);

function calculateAge(year) {
  console.log(2019 - year);
}

calculateAge(1990);

// yearsUntilRetirement(2010);

var yearsUntilRetirement = function(year) {
  console.log(65 - (2019 - year));
}

yearsUntilRetirement(2010);

// Hoisting - Variables
console.log(age);
var age = 23;
console.log(age);

// Hoisting
var a = 'Hello';
first();

function first() {
  var b = 'Hi!';
  second();

  function second() {
    var c = 'Hey!';
    // console.log(a + b + c);
    third();
  }
}

function third() {
  var d = 'John';
  console.log(c);
}

// The this keyword

console.log(this);

function calculateAge(year) {
  console.log(2019 - year);
  console.log(this);
}

calculateAge(1991);

var john = {
  name: 'John',
  yearOfBirth: 1989,
  calculateAge: function() {
    console.log(this);
    console.log(2019 - this.yearOfBirth);

    function innerFunction() {
      console.log(this);
    }

    innerFunction();
  }
}

john.calculateAge();

var mike = {
  name: 'Mike',
  yearOfBirth: 1984
}

mike.calculateAge = john.calculateAge;

mike.calculateAge();

// Passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el > 18 && el <= 81) {
    return Math.round(206.9 - (0.67 * el));
  }
  
  return -1;
}

var ages = arrayCalc(years, function(el) {
  return 2019 - el;
});
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);
*/

function interviewQuestion(job) {
  switch(job) {
    case 'designer':
      return function(name) {
        console.log(name + ', can you please explain what UX design is?');
      }
      break;
    case 'teacher':
      return function(name) {
        console.log('What subject do you teach, ' + name + '?');
      }
      break;
    default:
      return function(name) {
        console.log('Hello ' + name + ', what do you do?');
      }
      break;
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('Jane');
designerQuestion('John');
designerQuestion('Colt');
designerQuestion('Mike');
designerQuestion('White');