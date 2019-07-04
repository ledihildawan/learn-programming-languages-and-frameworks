function map(arr, callback) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(callback(arr[i], i, arr));
  }
  return newArr;
}

function tripleValues(arr) {
  return arr.map(function(value) {
    return value * 3;
  });
}

tripleValues([1, 2, 3]);

console.log(map([1, 2, 3], function(currentElement, currentIndex, array) {
  return currentElement * 3;
}));

function onlyFirstName(arr) {
  return arr.map(function(val) {
    return val.first;
  });
}

onlyFirstName([{first: 'Tim', last: 'Garica'}, {first: 'Mett', last: 'Lane'}]);

console.log(map([{first: 'Tim', last: 'Garica'}, {first: 'Mett', last: 'Lane'}], function(currentElement, currentIndex, array) {
  return currentElement.first
}));

// Exercise 1
function doubleValues(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}

// Exercise 2
function valTimesIndex(arr) {
  return arr.map(function(val, idx) {
    return val * idx;
  });
}

// Exercise 3
function extractKey(arr, key) {
  return arr.map(function(val) {
    return val[key];
  });
}

// Exercise 4
function extractFullName(arr) {
  return arr.map(function(val) {
    return val.first + ' ' + val.last
  });
}