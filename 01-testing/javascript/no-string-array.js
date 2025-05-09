function noStringArr(arr) {
  return arr.filter((item) => typeof item !== 'string');
}

console.log(noStringArr([1, 'two', 'three', 4, '5']));
