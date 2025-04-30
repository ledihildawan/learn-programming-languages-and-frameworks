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

// MemoizedAddTo80
function addTo80n(n) {
  console.log('long time');
  return n + 80;
}

function memoizedAddTo80(n) {
  let cache = {};
  return function memoizedAddTo80(n) {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = n + 80;

      return cache[n];
    }
  };
}

const memoized = memoizedAddTo80();

console.log('1', memoized(5));
console.log('2', memoized(5));
