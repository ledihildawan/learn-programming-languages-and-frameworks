function outer(a) {
  return function inner(b) {
    return a + b;
  }
}

console.log(outer(5)(5));

var storeOuter = outer(5);
console.log(storeOuter(15));