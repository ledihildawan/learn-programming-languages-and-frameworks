// Function Declaration
// Hoisted
// Hoisted mean when this code run, send to the top (function declaration)

function sayHi() {
  return console.log("hi");
}

sayHi();

function calculateAge(yearOfBirth) {
  const now = new Date();
  return parseInt(now.getFullYear()) - yearOfBirth;
}

function yearsUntilRetirement(name, yearOfBirth) {
  const age = calculateAge(yearOfBirth);
  const retirement = 65 - age;

  if (retirement >= 0) {
    return `${name} retires in ${retirement} years.`;
  } else {
    return `${name} has retired.`
  }
}

console.log(yearsUntilRetirement('Joko', 1996));

// Function Expression
// Anon, not named
// Function do not have a nave
// Not hoisiting
// Passed Arround or used
const sayHi2 = function () {
  return console.log("hi");
};

// Arrow function
// Powerful when handling this keyword
const sayHi3 = () => {
  return console.log("hi");
};

const sayHi4 = () => console.log("hi");

sayHi4();