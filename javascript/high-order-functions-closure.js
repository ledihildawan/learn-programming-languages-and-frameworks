// HOF
const hof = (fn) => fn(5);

hof(function a(x) {
  return x;
});

// Closure
const closure = function () {
  let count = 55;
  return function getCounter() {
    return count;
  };
};

const getCounter = closure();

getCounter();
getCounter();
getCounter();

// Currying
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
const curriedMultiplyBy5 = curriedMultiply(5);

curriedMultiply(5, 3);
curriedMultiplyBy5(10);
curriedMultiplyBy5(20);
curriedMultiplyBy5(2);
