/****************************************
 * Variables and data types
 */
/*
var firstName = "John";
console.log(firstName);

var lastName = "Smith";
var age = 23;

var fullAge = true;
console.log(fullAge);

var job;
console.log(job);

job = "Teacher";
console.log(job);

// Variable naming rules
var _3years = 3;
var johnMark = "John and Mark";
var if = 23;
*/

/****************************************
 * Variables mutation and type coercion
 */
/*
var firstName = "john";
var age = 28;

// Type coercion
console.log(firstName + " " + age);

var job, isMerried;
job = "teacher";
isMerried = false;

console.log(
  firstName +
    " is a " +
    age +
    " years old " +
    job +
    ". Is he merried? " +
    isMerried
);

// Variable mutation
age = "twenty eight";
job = "driver";

alert(
  firstName +
    " is a " +
    age +
    " years old " +
    job +
    ". Is he merried? " +
    isMerried
);

var lastName = prompt("What is hist last Name?");
console.log(firstName + " " + lastName);
*/

/****************************************
 * Basic Operators
 */
var year, yearJohn, yearMark;
now = 2018;
ageJohn = 28;
ageMark = 33;

// Math operators
yearJohn = now - ageJohn;
yearMark = now - ageMark;

console.log(yearJohn);

console.log(now + 2);
console.log(now * 2);
console.log(now / 10);

// Logical operators
var johnOlder = ageJohn < ageMark;
console.log(johnOlder);

// typeof operator
console.log(typeof johnOlder);
console.log(typeof ageJohn);
console.log(typeof "Mark is older than John");
var x;
console.log(typeof x);
