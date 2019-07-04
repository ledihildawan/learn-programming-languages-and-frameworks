function* pauseAndReturnValue(num) {
  for(let i = 0; i < num; i++) {
    yield i
  }
}

var gen = pauseAndReturnValue(3)

console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())