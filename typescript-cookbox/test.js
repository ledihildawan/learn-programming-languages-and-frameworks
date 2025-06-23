// @ts-check

let aNumber = 1000;

if (Math.random() < 0.5) {
  aNumber = 'Hello, World';
}

console.log(aNumber);

// Annotate only when you want your types checked.
