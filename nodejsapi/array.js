// Arrays are an important part of JavaScript as they allow you to store multipe values (even of mixed types) in one variable.
// JavaScript arrays are zero-indexed: the first element of an array is at index 0, and the last element is at the index equal to the value of the array's length property minus 1.
// Using an invalid index number returns undefined.

var array = [1, 2, 3, 4];

console.log(array[10]); // undefined

array.forEach(function(arr) {
  console.log(arr);
});

array.shift(); // 1
array.unshift("new"); // ["new", 2, 3, 4]
array[array.indexOf("new")] = "old"; // ["old", 2, 3, 4]
array.pop(); // 4

var newArray = array.slice(1, 3); // [2, 3];

console.log(newArray);

// Create new array and return only type of value is string
console.log(array.filter(function(value) {
  return typeof value === "string";
})); // ["old"]

// Create new array and return array with doubled number if tyeof value is number
console.log(array.map(function(value) {
  if (!isNaN(value)) {
    return value * 2;
  }
  return value;
})); // ["old", 4, 6]

array.reverse(); // [3, 2, "old"]

var combineArray = array.concat(newArray); // [3, 2, "old", 2, 3]

array.join(", "); // "3, 2, old"

// Reduce values to single value
console.log(array.reduce(function(total, value) {
  if (typeof value === "string") {
    value = 0;
  }
  return total + value;
})); // 5