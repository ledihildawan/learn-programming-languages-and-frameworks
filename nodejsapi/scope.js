// 1
var test = "Global Scope";

function localScope() {
  var test = "Local Scope";
  console.log(test);
}

localScope(); // "Local Scope"
console.log(test); // "Global Scope"

// 2
function localScope() {
  var test = "Local Scope";
  console.log(test);
}

localScope(); // "Local Scope"
console.log(test); // Uncaught ReferenceError...

// 3
function localScope() {
  test = "Local Scope";
  console.log(test);
}

localScope(); // "Local Scope"
console.log(test); // "Local Scope"

// The if statement executes a statement if a specified condition is truthy. If the condition is falsy, another statement can be executed.