console.log("utils.js");

const square = number => number * number;
const add = (numberOne, numberTwo) => numberOne + numberTwo;
const subtract = (numberOne, numberTwo) => numberOne - numberTwo;

export { square, add, subtract as default };
