function every(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr) === false) {
      return false;
    }
  }
  return true;
}

console.log(every([-1, -2, -3], function(val, idx, arr) {
  return val < 0;
}));

console.log(every([1, 2, 3], function(val, idx, arr) {
  return val > 2;
}));

console.log(every('this is really nice'.split(''), function(val, idx, arr) {
  return val === val.toLowerCase();
}));

console.log(every([[1], [2], [3, 4]], function(val, idx, arr) {
  return Array.isArray(val);
}));

console.log(every([[1], [2], {}], function(val, idx, arr) {
  return Array.isArray(val);
}));

// Exercise 1
function hasOddNumber(arr) {
  return arr.some(function(val) {
    return val % 2 !== 0;
  });
}
console.log(hasOddNumber([4, 6, 1]));

// Exercise 2
function hasAZero(num) {
  return num.toString().split('').some(function(val) {
    return val === '0';
  });
}
console.log(hasAZero(23032132101));

// Exercise 3
function hasOnlyOddNumbers(arr) {
  return arr.every(function(val) {
    return val % 2 !== 0;
  })
}
console.log(hasOnlyOddNumbers([1, 2, 3, 4, 5]));

// Exercise 3
function hasNoduplicates(arr) {
  return arr.every(function(val) {
    return arr.indexOf(val) === arr.lastIndexOf(val);
  });
}
console.log(hasNoduplicates([1, 2, 3, 4]));