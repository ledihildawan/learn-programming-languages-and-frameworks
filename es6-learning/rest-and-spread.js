// rest
function sum(...numbers) {
  return numbers.reduce((prev, current) => prev + current);
}

console.log(sum(1, 2, 3));

// spread
function sum2(x, y) {
  return x + y;
}

const nums = [1, 2];
console.log(sum2(...nums));