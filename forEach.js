// function forEach(array, callback) {
//   for (let i = 0; i < array.length; i++) {
//     callback(array[i], i, array)
//   }
// }

// const strings = ['my', 'forEach', 'example']

// let result = ''

// forEach(strings, function(str, index, array) {
//   if (array.length - 1 !== index) {
//     result += str + ' '
//   } else {
//     result += str + '!!!'
//   }
// })

// console.log(result)

// const arr = [1, 2, 3, 4, 5, 6]

// function forEach(arr, callback) {
//   for (let i = 0; i < arr.length; i++) {
//     callback(arr[i])
//   }
// }

// forEach(arr, function(number) {
//   console.log(number * 2)
// })

function doubleValues(arr) {
  var newArr = [];
  arr.forEach(function(val) {
    newArr.push(val * 2);
  });
  return newArr;
}

function onlyEvenValues(arr) {
  var newArr = [];
  arr.forEach(function(val) {
    if (val % 2 == 0) {
      newArr.push(val);
    }
  });
}

function showFirstAndLast(arr) {
  var newArr = [];
  arr.forEach(function(val) {
    newArr.push(val[0] + val[val.length - 1]);
  });
  return newArr;
}

function addKeyAndValue(arr, key, value) {
  arr.forEach(function(val) {
    val[key] = value;
  });
  return arr;
}

function vowel(str) {
  var splitArr = str.split('');
  var obj = {};
  var vowels = 'aeiou';

  splitArr.forEach(function(letter) {
    if (vowels.indexOf(letter.toLowerCase()) !== -1) {
      if (letter in obj) {
        obj[letter]++;
      } else {
        obj[letter] = 1;
      }
    }
  });

  return obj;
}

vowel('collage is bullshit');