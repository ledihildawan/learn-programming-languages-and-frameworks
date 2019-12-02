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
/*
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
*/

/****************************************
 * Precedence operator
 */
/*
var now = 2018;
var yearJohn = 1989;
var fullAge = 18;

var isFullAge = now - yearJohn >= fullAge;
console.log(isFullAge);

var ageJohn = now - yearJohn;
var ageMark = 35;
var average = (ageJohn + ageMark) / 2;
console.log(average);

// Multiple assignments
var x, y;
x = y = (3 + 5) * 4 - 6; // 8 * 4 - 6 // 32 - 6 // 26
console.log(x, y);

// More operators
x *= 2;
console.log(x);
x += 10;
console.log(x);
x--;
console.log(x);
*/

/****************************************
 * Coding Challenge 1
 */
var markWeight = 55;
var markHeight = 150;
var johnWeight = 60;
var johnHeight = 170;

var markBMI = markWeight / markHeight ** 2;
var johnBMI = johnWeight / johnHeight ** 2;
console.log(markBMI, johnBMI);

var markBMIGreatherThanJohnBMI = markBMI > johnBMI;
var johnBMIGreatherThanMarkBMI = !markBMIGreatherThanJohnBMI;

console.log("Is Mark's BMI higher than John's ", markBMIGreatherThanJohnBMI);
console.log("Is John's BMI higher than Mark's ", johnBMIGreatherThanMarkBMI);
