// Cannot be a reserved keyword
// Should be meaningful
// Cannot start with number (1name)
// Cannot contain a space or hyphen (-)

// If you don't need reassign use const otherwise let

// Primitive Types
let name = "ledi"; // String literal
let age = 22; // Number literal
let isMerried = false; // Boolean literal
let middleName = undefined;
let hasChild = null; 

// References Types
// Object
let person = {
  name: "ledi",
  age: 22
};

// Dot notaion
person.name = 'john';

// Bracket notation
let selection = 'name'
person[selection] = 'mary';

// Array
let selectedColors = ['red', 'green'];
selectedColors[2] = 1;
console.log(selectedColors[0]);
console.log(selectedColors.length);

// Function
function greet(name) {
  console.log('Hello ' + name);
}

function square(num) {
  return num * num;
}

console.log(square(3));

greet('john');