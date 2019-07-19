function some(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}

console.log(some([1, 2, 3], function(val, idx, arr) {
  return val < 2;
}));

console.log(some([1, 2, 3], function(val, idx, arr) {
  return val > 4;
}));

console.log(some([1, 2, 3, 4], function(val, idx, arr) {
  return val % 2 === 0;
}))

console.log(some([1, 3, 5], function(val, idx, arr) {
  return val % 2 === 0;
}));