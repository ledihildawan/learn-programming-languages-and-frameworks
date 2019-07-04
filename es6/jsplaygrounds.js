// Array Helper Methods

// forEach
var colors = ['red', 'green', 'blue'];

colors.forEach(function (color) {
  console.log(color);
});

// Exercise
var numbers = [1, 2, 3, 4, 5];
var sum = 0;

function adder(number) {
  sum += number;
}

numbers.forEach(adder);

console.log(sum);

// When to use forEach
// Deleting all Selected

// map
var numbers = [1, 2, 3];

var dobuled = numbers.map(function (number) {
  return number * 2;
});

console.log(dobuled);

// filter
// find
// every
// some
// reduce