// Custom filter
function filter(arr, callback) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

console.log(filter([1, 2, 3], function(value, index, array) {
  return value > 2;
}));

console.log(filter(['Rusty', 'Matt', 'Maxio', 'Colt'], function(val, idx, arr) {
  return val.length === 4;
}));

console.log(filter([1, 2, 3, 4, 5, 6, 7, 8, 9], function(val, idx, arr) {
  return val % 3 === 0;
}));

console.log(filter([{name: 'Ellie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'colt'}], function(val, idx, arr) {
  return val.name.length > 3;
}));

// Filter method
var arr = [1, 2, 3];

arr.filter(function(value, index, array) {
  // no need for an if statement
  // just return an expression
  // that evaluates to true or false!
  return value > 2
});

// Exercise 1
function filterByValue(arr, key) {
  return arr.filter(function(val) {
    return val[key] !== undefined;
  });
}

const person = [
  {
    name: 'john slow',
  },
  {
    name: 'jane doe',
  },
  {
    name: 'diane',
  }
];

console.log(filterByValue(person, 'name'));

function removeVowels(str) {
  var vowels = 'aeiou';
  return str.toLowerCase().split('').filter(function(val) {
    return vowels.indexOf(val) === -1;
  }).join('');
}

console.log(removeVowels('Testing'))

function doubleOddNumbers(arr) {
  return arr.filter(function(val) {
    return val % 2 !== 0;
  }).map(function(val) {
    return val * 2;
  });
}

console.log(doubleOddNumbers([1, 2, 3, 4, 5, 6]));