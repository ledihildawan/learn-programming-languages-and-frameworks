// Single-line comments start with two slashes.
/* Multiline comments start with slash-star,
   and end with star-slash */

// Statements can be terminated by ;
// but they don't have to be, as semicolons are automatically inserted
// wherever there's a newline, except in certain cases.

///////////////////////////////////
// 1. Numbers, Strings and Operators

// JavaScript has one number type (which is a 64-bit IEEE 754 double).
// Doubles have a 52-bit mantissa, which is enough to store integers
// up to about 9✕10¹⁵ precisely.

3;
1.5;
Infinity;
-Infinity;
NaN;

('abc');
('Hello, world');

true;
false;

null; // used to indicate a deliberate non-value
undefined; // used to indicate a value is not currently present (although `undefined` is actually a value itself)

1 + 1;
0.1 + 0.3;
8 - 1;
10 * 2;
35 / 5;
5 / 2;
10 % 2;
30 % 2;
18.5 % 7;
2 ** 8;
1 + 3 * 2;
(1 + 3) * 2;

Math.floor(5 / 3);
Math.floor(-5 / 3);
Math.floor(5.0 / 3.0);
Math.floor(-5.0 / 3.0);

1 << 2;
!true;
!false;
true && false;
false || true;
true + true;
true * 8;
false - 5;
0 == true;
2 > false;
(2 == false - 5) != true;
1 === 1;
2 === 1;
1 !== 1;
2 !== 1;
1 < 10;
1 > 10;
2 <= 2;
2 >= 2;
1 < 2 && 2 < 3;
2 < 3 && 3 < 2;
1 < 2 < 3;
2 < 3 < 2;

Boolean(0);
Boolean('');
Boolean([]);
Boolean({});
Boolean(new Set());
Boolean(4);
Boolean(-6);

'Hello ' + 'world';
'1, 2, ' + 3;
'Hello ' + ['world', '!'];
13 + !0;
'13' + !0;
'a' < 'b';
'5' == 5;
null === undefined;
'5' === 5;
null === undefined;

'This is a string'.charAt(0);
'Hello world'.substring(0, 5);
'Hello'.length;

let fullName = 'Ledi Hildawan';

///////////////////////////////////
// 2. Variables, Arrays and Objects

// JavaScript is dynamically typed, so you don't need to specify type.
// Assignment uses a single `=` character.

console.log("I'm JavaScript. Nice to meet you!");
const inputStrinVal = prompt('Enter some data: ');

const pi = 3.14;

let someVar = 5;
let someThirdVar;

someVar += 5;
someVar *= 10;
someVar++;
someVar--;

0 > 1 ? 'Yey!' : 'Nay!';

// Arrays are ordered lists of values, of any type.
const myArray = ['Hello', 45, true];

myArray[1];
myArray.push('World');
myArray.length;

myArray[3] = 'Hello';

myArray.unshift(3);

someVar = myArray.shift();

myArray.push(3);

someVar = myArray.pop();

const myArray0 = [32, false, 'js', 12, 56, 90];

myArray0.join(';');
myArray0.slice(1, 4);
myArray0.splice(2, 4, 'wr', 'ld');

myArray0[myArray0.length - 1];
myArray0.filter((_, idx) => idx < 3);
myArray0.filter((_, idx) => idx % 2 === 0);
myArray0.reverse();

const li2 = [...myArray0];

li2.filter((_, idx) => idx !== 2);
li2.filter((el) => el !== 'wr');
li2.splice(1, 0, 2);
li2.at(2);
li2.findIndex((el) => el === 'ld');
li2.concat(myArray0);
li2.splice(li2.length, 0, ...myArray0);
li2.includes('ld');

const tup = Object.freeze([1, 2, 3]);

tup[0];
tup.concat(4, 5, 6);
tup.slice(0, 2);
tup.includes(2);

let [a, b, c] = [...tup];
[a, b, ...c] = Object.freeze([1, 2, 3, 4]);
let [d, e, f] = Object.freeze([4, 5, 6]);

[d, e] = [e, d];

// JavaScript's objects are equivalent to "dictionaries" or "maps" in other
// languages: an unordered collection of key-value pairs.

const myObj = { myKey: 'myValue', 'my other key': 4 };

myObj['my other key'];
myObj.myKey;
myObj.myThirdKey = true;
myObj.myFourthKey;
myObj.myFifthKey = 5;

delete myObj.myFifthKey;

Object.hasOwn('myKey');
Object.keys(myObj);
Object.values(myObj);

const { myKey } = myObj;

const emptySet = new Set();
const someSet = new Set([1, 1, 2, 2, 3, 4]);
const otherSet = new Set([3, 4, 5, 6]);

someSet.add(5);

function getIntersectionSet(set1, set2) {
  return new Set([...set1].filter((element) => set2.has(element)));
}

getIntersectionSet(someSet, otherSet);

new Set([...someSet, ...otherSet]);

function getDifferenceSet(set1, set2) {
  return new Set([...set1].filter((element) => !set2.has(element)));
}

getDifferenceSet(someSet, otherSet);

function getSymmetricDifference(set1, set2) {
  const sec = getIntersectionSet(set1, set2);

  return new Set([...set1, ...set2].filter((element) => !sec.has(element)));
}

getSymmetricDifference(new Set([1, 2, 3, 4]), new Set([2, 3, 5]));

function isSuperSetLeft(set1, set2) {
  return [...set2].every((element) => set1.has(element));
}

isSuperSetLeft(new Set([1, 2]), new Set([1, 2, 3]));

function isSuperSetRight(set1, set2) {
  return [...set1].every((element) => set2.has(element));
}

isSuperSetRight(new Set([1, 2]), new Set([1, 2, 3]));

someSet.has(2);
someSet.has(10);

const filledSet = new Set([...someSet]);

someSet === filledSet;

///////////////////////////////////
// 3. Logic and Control Structures

const count = 1;

if (count == 3) {
  console.log('evaluated if count is 3');
} else if (count == 4) {
  console.log('evaluated if count is 4');
} else {
  console.log("evaluated if it's not either 3 or 4");
}

let x = 0;

while (x < 4) {
  console.log(x);

  x++;
}

// while (true) {
//   // An infinite loop!
// }

// let inputVal;
// do {
//     inputVal = getInput();
// } while (!isValid(inputVal));

for (var i = 0; i < 5; i++) {
  console.log('Will run 5 times');
}

const animals = ['dog', 'cat', 'mouse'];

for (let i = 0; i < animals.length; i++) {
  console.log(`${animals[i]} is a mamal`);
}

outer: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      console.log(i, j);
      break outer;
      // breaks out of outer loop instead of only the inner one
    }
  }
}

let description = '';

const person = { fname: 'Paul', lname: 'Ken', age: 18 };

for (const x in person) {
  description += person[x] + ' ';
}

let myPets = '';

const pets = ['cat', 'dog', 'hamster', 'hedgehog'];

for (const pet of pets) {
  myPets += pet + ' ';
}

const house = {
  size: 'small',
  colour: 'red',
};

if (house.size == 'big' && house.colour == 'blue') {
  house.contains = 'bear';
}

if (house.colour == 'red' || house.colour == 'blue') {
  console.log('colour is either red or blue');
}

let otherName;

const name = otherName || 'default';

// try {
//   throw new Error('This is an index error');
// } catch (e) {
//   if (e instanceof IndexError) {
//     // Handle IndexError
//   } else if (e instanceof TypeError || e instanceof NameError) {
//     // Handle TypeError or NameError
//   } else {
//     console.log('All good!');
//   }
// } finally {
//   console.log('We clean up resources here');
// }

const fs = require('fs').promises;

fs.open('myfile.txt')
  .then((data) => data.readFile('utf-8'))
  .then((data) => {
    const lines = data.split('\n');

    for (const line of lines) {
      console.log(`${line}\n`);
    }
  });

// const contents = { aa: 12, bb: 21 };

fs.open('myfile1.txt', 'a+').then((data) =>
  data.write(JSON.stringify(contents))
);

const contents = { aa: 12, bb: 21 };

let ourIterable = Object.keys(contents);

for (const i of ourIterable) {
  console.log(i);
}

function* generator(items) {
  let idx = 0;

  while (true) {
    yield items[idx];

    idx++;
  }
}

ourIterable = generator(ourIterable);

ourIterable.next().value;

ourIterable = Object.keys(contents);

for (const i of ourIterable) {
  console.log(i);
}

const grade = 'B';

switch (grade) {
  case 'A':
    console.log('Great job');
    break;
  case 'B':
    console.log('OK job');
    break;
  case 'C':
    console.log('You can do better');
    break;
  default:
    console.log('Oy vey');
    break;
}

///////////////////////////////////
// 4. Functions, Scope and Closures

// JavaScript functions are first class objects, so they can be reassigned to
// different variable names and passed to other functions as arguments

// Function objects don't even have to be declared with a name - you can write
// an anonymous function definition directly into the arguments of another.

function myFunction(thing) {
  return thing.toUpperCase();
}

myFunction('foo');

// Closures, a function is defined inside another function,
// the inner function has access to all the outer function's variables,
// even after the outer function exits.

function sayHelloInFiveSeconds(name) {
  const prompt = 'Hello, ' + name + '!';

  function inner() {
    alert(prompt);
  }

  setTimeout(inner, 5000);
}

sayHelloInFiveSeconds('Adam');

const isEven = (number) => {
  return number % 2 === 0;
};

isEven(7);

function add(x, y) {
  console.log(`x is ${x} and y is ${y}`);
  return x + y;
}

add(5, 6);

function varargs(...args) {
  return args;
}

varargs(1, 2, 3);

function keywordArgs(...args) {
  return args.reduce((acc, arg) => {
    acc[arg[0]] = arg[1];

    return acc;
  }, {});
}

keywordArgs(['big', 'foot'], ['loch', 'ness']);

function allTheArgs(...args) {
  console.log(args);
}

const args = [1, 2, 3, 4];
const kwargs = { a: 3, b: 4 };

allTheArgs(...args);
allTheArgs({ ...kwargs });
allTheArgs(...args, { ...kwargs });

function swap(x, y) {
  return [y, x];
}

let xx = 10;
let y = 2;

[xx, y] = swap(10, 2);

// Global Scope
let xxx = 5;

function setXXX(num) {
  // Local scope
  let xxx = num;
  console.log(xxx);
}

function setGlobalXXX(num) {
  console.log(xxx);
  xxx = num;
  console.log(xxx);
}

setXXX(43);
setGlobalXXX(6);

function createAdder(x) {
  function adder(y) {
    return x + y;
  }

  return adder;
}

const add10 = createAdder(10);

add10(3);

// There are also anonymous functions
((x) => x > 2)(3);
((x, y) => x ** 2 + y ** 2)(2, 1);

[1, 2, 3].map((el) => add10(el));
[1, 2, 3].map((el, idx) => Math.max(el, [4, 6, -1][idx]));
[3, 4, 5, 6, 7].filter((x) => x > 5);

new Set(Array.from('abcddeef').filter((x) => !['a', 'b', 'c'].includes(x)));
Array.from({ length: 5 }, (_, x) => ({ [x]: x ** 2 })).reduce(
  (acc, obj) => ({ ...acc, ...obj }),
  {}
);

///////////////////////////////////
// 5. Modules
///////////////////////////////////

// import math from 'math'

// console.log(math.sqrt(16))

// import { ceil, floor } from 'math'

// console.log(ceil(3.7))
// console.log(floor(3.7))

// import math as m from 'a'

// m.sqrt(16) === m.sqrt(16)

///////////////////////////////////
// 5. Classes
///////////////////////////////////

class Human {
  static species = 'H. sapiens';

  constructor(name) {
    this.name = name;
    this._age = 0;

    console.log(this.species);
  }

  say(msg) {
    console.log(`${this.name}: ${msg}`);
  }

  sing() {
    return 'yo... yo... microphone check... one two... one two...';
  }

  static getSpecies() {
    return Human.species;
  }

  static grunt() {
    return '*grunt*';
  }

  get age() {
    return this._age;
  }

  set age(age) {
    this._age = age;
  }

  deleteAge() {
    delete this._age;
  }
}

const i = new Human('Ian');
const j = new Human('Joel');

i.say('hi');
j.say('hello');

class Superhero extends Human {
  species = 'Superhuman';

  constructor(
    name,
    movie = false,
    superpowers = ['super strength', 'bulletproofing']
  ) {
    super(name);

    this.fictional = true;
    this.movie = movie;
    this.superpowers = superpowers;
  }

  sing() {
    return 'Dun, dun, DUN!';
  }

  boast() {
    for (const power of this.superpowers) {
      console.log(`I wield the power of ${power}!`);
    }
  }
}

class Bat {
  species = 'Baty';

  constructor(canFlay = false) {
    this.canFlay = canFlay;
  }

  say(msg = '... ... ...') {
    return msg;
  }

  sonar() {
    return '))) ... (((';
  }
}

const SuperheroMixin = (classType) =>
  class extends classType {
    constructor(name, options, ...args) {
      super(...args);

      this.name = name || 'Unknown';
      this.movie = options.movie || false;
      this.superpowers = options.superpowers || [];
    }
  };

const BatMixin = (superclass) =>
  class extends superclass {
    constructor(...args) {
      super(...args);
      this.can_fly = false;
    }
  };

class Batman extends SuperheroMixin(BatMixin(Bat)) {
  constructor(...args) {
    super('anonymous', { movie: true, superpowers: ['Wealthy'] }, ...args);

    this.name = 'Ben Affleck';
  }

  sing() {
    return 'nan nan nan nan nan batman!';
  }
}

const benAfflect = new Batman();
