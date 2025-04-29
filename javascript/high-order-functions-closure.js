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
