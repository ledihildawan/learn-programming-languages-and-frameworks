// Function Declaration
// Hoisted
// Hoisted mean when this code run, send to the top (function declaration)

function sayHi() {
  return console.log("hi");
}

sayHi();

// Function Expression
// Anon, not named
// Function do not have a nave
// Not hisiting
// Passed Arround or used
const sayHi = function () {
  return console.log("hi");
};

// Arrow function
// Powerful when handling this keyword
const sayHi = () => {
  return console.log("hi");
};

const sayHi = () => console.log("hi");

sayHi();