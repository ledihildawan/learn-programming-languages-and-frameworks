function *numbers() {
  console.log('Begin');
  yield 1;
  yield 2;
  yield 3;
}

let iterator = numbers();

function *range(start, end) {
  while (start <= end) {
    yield start;

    start++;
  }
}

let it = range(1, 5);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

for (let i of it) {
  console.log(i);
}

console.log(...range(1, 5));