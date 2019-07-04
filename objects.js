var person = {
  firstName: 'Colt',
  sayHi: function() {
    return 'Hi ' + this.firstName;
  },
  determineContext: function() {
    return this === person;
  },
  dog: {
    sayHello: function() {
      return 'Hello ' + this.firstName;
    },
    determineContext: function() {
      return this === person;
    }
  }
}

// console.log(person.dog.sayHello.call(person));
// console.log(person.dog.determineContext.call(person));

// Call
var colt = {
  firstName: 'Colt',
  sayHi: function() {
    return 'Hi ' + this.firstName;
  }
}

var elie = {
  firstName: 'Elie',
}

// colt.sayHi();
// console.log(colt.sayHi.call(elie));

function sayHi() {
  return 'Hi ' + this.firstName;
}

var colt = {
  firstName: 'Colt'
}

var elie = {
  firstName: 'Elie'
}

// console.log(sayHi.call(colt));
// console.log(sayHi.call(elie));

// add parameters
function addNumbers(a, b, c, d) {
  return this.firstName + ' just calculated ' + (a + b + c + d);
}

var colt = {
  firstName: 'Colt'
};

var elie = {
  firstName: 'Elie'
};

// console.log(addNumbers.call(elie, 1, 2, 3, 4));
// console.log(addNumbers.apply(elie, [1, 2, 3, 4]));
// console.log(Math.max.apply(this, [5, 7, 1, 4, 2]));

function sumValues(a, b, c) {
  return a + b + c;
}

var values = [4, 1, 2];

// console.log(sumValues.apply(this, values))vv;

var elieCalc = addNumbers.bind(elie);
// console.log(elieCalc(1, 2, 3, 4));

// nice
var colt = {
  firstName: 'Colt',
  sayHi: function() {
    setTimeout(function() {
      console.log('Hi ' + this.firstName);
    }, 1000);
  }
}

// colt.sayHi();

var colt = {
  firstName: 'Colt',
  sayHi: function() {
    setTimeout(function() {
      console.log('Hi ' + this.firstName);
    }.bind(this), 1000);
  }
}

// colt.sayHi();

// 
function arrayFrom(arrayLikeObject) {
  return [].slice.call(arrayLikeObject);
}

function sumEvenArguments() {
  var newArgs = [].slice.call(arguments);
  return newArgs.reduce(function(acc, next) {
    if (next % 2 === 0) {
      return acc + next;
    }
    return acc;
  });
}

// console.log(sumEvenArguments(1, 2, 3, 3, 3, 4, 4));

function invokeMax(fn, num) {
  var max = 0;
  return function() {
    if (max >= num) {
      return 'Maxed Out!';
    } 
    max++;
    return fn.apply(this, arguments);
  }
}

console.log(invokeMax(Math.max, 1)())