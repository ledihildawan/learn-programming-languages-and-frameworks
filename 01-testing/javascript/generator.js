function* gen(i) {
  yield i;
  yield i + 10;
}

console.log(gen(5).next());
