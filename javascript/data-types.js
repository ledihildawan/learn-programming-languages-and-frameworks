// Strings, numbers and booleans

// String
// Number
// Boolean
// Null
// Undefined
// Symbol
// BigInt

logger('Hello world');
logger('Hello ' + 'world');
logger(27);
logger(27 + 73);
logger(50 - 30);
logger(5 * 10);
logger(100 / 10);
logger(500 % 3);
logger(true);

// Declaring Variables

let sum = 0;
logger(sum); // 0

let num1 = 300;
let num2 = 50;
sum = num1 + num2;
logger(sum); // 350

// Functions

function logger(arg) {
  logger(arg);
}

const add = (num1, num2) => num1 + num2;
const multiply = (num1, num2) => num1 * num2;
const ten = (_) => 10;

const resultAdd = add(56, 44);
const resultTen = ten();
const resultMultiply = multiply(20, 10);

logger(`I'm the king of the world!`);
logger(resultAdd);
logger(resultTen);
logger(resultMultiply);

// Objects

const anObject = {
  string: 'Yay',
  number: 1,
  boolean: true,
  anotherObject: {},
  aFunction: function () {},
  anArray: [],
};

const dictionary = {
  dream:
    "a series of thoughts, images, and sensations occurring in a person's mind during sleep",
  happy: 'feeling or showing pleasure or contentment',
};

const macbook = {
  operatingSystem: 'macOS Sierra',
  screenResolution: '2880x1800',
  screenSize: '15.4 inch',
  usbPorts: 2,
  storage: '512gb',
  playMusic: function () {},
};

macbook.storage = '256gb';
macbook.playMusic();

macbook['usbPorts'] = 2;
macbook['playMusic']();

const propertyToGet = 'usbPorts';
const macbookStorage = macbook.storage;
const macbookDotNotation = macbook.screenSize;
const macbookBracketNotation = macbook[propertyToGet];

logger(macbookStorage);
logger(macbookDotNotation);
logger(macbookBracketNotation);

delete macbook.storage;

logger(macbook);

const human = {
  firstName: 'Ledi',
  sayName: function () {
    logger('My name is Ledi');
  },
  sayAge(age) {
    logger('I am ' + age + ' years old');
  },
};

human.lastName = 'Hildawan';
human.sayAge(26);

logger(human.firstName);
logger(human.lastName);

// If/else statements

logger(24 > 23);
logger(24 > 24);
logger(24 >= 24);
logger(24 < 25);
logger(24 < 24);
logger(24 <= 24);
logger('24' === 24);
logger('24' == 24);
logger('24' !== 24);
logger('24' != 24);
logger(0 == false);
logger(1 == true);
logger(2 == true);

const zell = { isHavingFun: true };
const vincy = { isHavingFun: true };

logger(zell === vincy);
logger(zell == vincy);

const ledi = 26;
const james = 22;
const valerie = 25;
const kenneth = 27;

if (ledi < james) {
  logger('Ledi is youger than James');
} else if (ledi > valerie) {
  logger('Ledi is older than Valerie');
} else if (ledi === kenneth) {
  logger('Ledi is old is as Kenneth');
}

logger(!2550284);
logger(!true);
logger(!NaN);
logger(!{});
logger(!!'Pandas are adorable!');
logger(!!'');
logger(null === undefined);
logger(window);
logger(document);

// Array

const strings = ['One', 'Two', 'Three', 'Four'];
const numbers = [1, 2, 3, 4];
const booleans = [true, true, false, true];
const objects = [{ name: 'Ledi' }, { name: 'Delis' }];
const arrays = [
  [1, 2, 3],
  [1, 2, 3],
];
const groceriesToBuy = ['cabbage', 'tomato sauce', 'salmon'];
const people = [
  'Benjamin Franklin',
  'Thomas Edison',
  'Franklin Roosevelt',
  'Mahatma Gandhi',
  'Napoleon Bonaparte',
  'Abraham Lincoln',
];
const franklin = people[0];
const gandhiIndex = people.indexOf('Mahatma Gandhi');

people[1] = 'Inventor of the lightbulb';

const lastItemString = strings[strings.length - 1];
const secondLastItem = strings[strings.length - 2];
const thirdLastItem = strings[strings.length - 3];

strings[0] = 1;
strings[9] = 'Ten';

numbers.unshift(5, 6);
numbers.push(7);
numbers.splice(0, 0, 8, 9);
numbers.splice(numbers.length, 0, 10, 11);

const itemOne = numbers.shift();
const itemTwo = numbers.shift();
const lastItem = numbers.pop();
const deleted = numbers.splice(0, 2);
const copy = people.slice();

copy.unshift('Winston Churchill', 'Albert Einstein');
copy.push('Charles Darwin', 'Walt Disney');
copy.splice(gandhiIndex + 1, 0, 'Pablo Picasso', 'Ludwig van Beethoven');
copy.shift();
copy.shift();
copy.pop();
copy.splice(gandhiIndex, 1);

logger(copy);
logger(strings);
logger(numbers);
logger(numbers.length);
logger(deleted);
logger(lastItemString);
logger(secondLastItem);
logger(thirdLastItem);
logger(people);

const fruitBasket = ['apple', 'banana', 'orange', 'pear'];
const posOfBanana = fruitBasket.indexOf('banana');
const posOfKiwi = fruitBasket.indexOf('kiwi');

// For loops

const array = [];

for (const num of numbers) {
  array.push(num * 5);
}

const newPeople = [
  { firstName: 'Benjamin', lastName: 'Franklin', yearOfDeath: 1790 },
  { firstName: 'Thomas', lastName: 'Edison', yearOfDeath: 1931 },
  { firstName: 'Franklin', lastName: 'Roosevelt', yearOfDeath: 1945 },
  { firstName: 'Napolean', lastName: 'Bonaparte', yearOfDeath: 1821 },
  { firstName: 'Abraham', lastName: 'Lincoln', yearOfDeath: 1865 },
  { firstName: 'Mother', lastName: 'Theresa', yearOfDeath: 1962 },
  { firstName: 'Mahatma', lastName: 'Gandhi', yearOfDeath: 1948 },
  { firstName: 'Winston', lastName: 'Churchill', yearOfDeath: 1965 },
  { firstName: 'Charles', lastName: 'Darwin', yearOfDeath: 1882 },
  { firstName: 'Albert', lastName: 'Einstein', yearOfDeath: 1955 },
  { firstName: 'Pablo', lastName: 'Picasso', yearOfDeath: 1973 },
  { firstName: 'Ludwig', lastName: 'Beethoven', yearOfDeath: 1827 },
  { firstName: 'Walt', lastName: 'Disney', yearOfDeath: 1966 },
  { firstName: 'Henry', lastName: 'Ford', yearOfDeath: 1947 },
  { firstName: 'Steve', lastName: 'Jobs', yearOfDeath: 2012 },
];

newPeople.forEach((person) => {
  logger(person.firstName);
});

const firstNames = [];
newPeople.forEach((person) => {
  firstNames.push(person.firstName);
});

const diedAfter1950 = [];
newPeople.forEach((person) => {
  if (person.yearOfDeath > 1950) {
    diedAfter1950.push(person);
  }
});

let darwinIndex = -1;
newPeople.forEach((person, index) => {
  if (person.lastName === 'Darwin') {
    darwinIndex = index;
  }
});

// DOM

{
  /* <ul id="star-wars-characters">
  <li class="character luke" data-type="hero">Luke Skywalker</li>
  <li class="character yoda" data-type="master">Yoda</li>
  <li class="character badboy" data-type="villain">Darth Vader</li>
</ul> */
}

const characters = document.querySelector('#star-wars-characters');
const luke = characters.querySelector('.luke');
const yoda = characters.querySelector('[data-type=master]');
const darthVader = characters.querySelector('.badboy');

{
  /* <div class="add">Add a "red" class to me!</div>
<div class="remove">Remove the class, "remove" from me!</div>
<div class="contains1">Do I have a "blue" class?</div>
<div class="contains2 blue">Do I have a "blue" class?</div>
<div class="toggle">Do I have a "red" class? If yes, remove it. If no, add it.</div> */
}

const addClass = document.querySelector('.add');
addClass.classList.add('red');

const remove = document.querySelector('.remove');
remove.classList.remove('remove');

const div1 = document.querySelector('.contains1');
const div2 = document.querySelector('.contains2');
div1.classList.contains('blue');
div2.classList.contains('blue');

const div = document.querySelector('.toggle');
div.classList.toggle('red');

document.body.addEventListener('click', (evt) => {
  logger('Clicked!');
});

const button = document.querySelector('button');
button.addEventListener('click', (evt) => {
  button.classList.toggle('clicked');
});

div.setAttribute('data-play', true);

const attr = div.getAttribute('data-play');
logger(attr);

div.dataset.stripes = 3;

const stripes = div.dataset.stripes;
logger(stripes);

div.removeAttribute('data-play');
div.removeAttribute('data-stripes');
logger(div);

const style = div.style;
const computedStyle = getComputedStyle(div);

{
  /* <div id="star-wars">
  <div class="character" data-type="good-guy">Luke Skywalker</div>
  <div class="character" data-type="good-guy">Yoda</div>
  <div class="character" data-type="villain">Darth Vader</div>
</div> */
}

const goodGuys = document.querySelectorAll('[data-type="good-guy"]');
Array.from(goodGuys).forEach((elem) => elem.classList.add('yay'));

const badGuys = document.querySelectorAll('[data-type="villain"]');
Array.from(badGuys).forEach((elem) => elem.classList.add('nay'));

const newCharacters = document.querySelectorAll('.character');
Array.from(newCharacters).forEach((elem) => elem.classList.add('star-wars'));

const domRect = div.getBoundingClientRect();

const list = document.querySelector('.list');
const listItems = list.children;
const firstItem = list.firstElementChild;
const list2 = list.parentElement;

{
  /* <ul class="list">
  <li><a href="#">Link 1</a></li>
  <li><a href="#">Link 2</a></li>
  <li><a href="#">Link 3</a></li>
  <li><a href="#">Link 4</a></li>
  <li><a href="#">Link 5</a></li>
</ul> */
}

const firstLink = document.querySelector('a');
const listA = firstLink.closest('.list');
const firstListItem = document.querySelector('li');
const secondListItem = firstListItem.nextElementSibling;
const thirdListItem = document.querySelectorAll('li')[2];
const secondListItem2 = secondListItem.previousElementSibling;

{
  /* <div class="characters">
  <ul class="hobbits">
    <li>Frodo Baggins</li>
    <li>Samwise "Sam" Gamgee</li>
    <li>Meriadoc "Merry" Brandybuck</li>
    <li>Peregrin "Pippin" Took</li>
    <li>Bilbo Baggins</li>
  </ul>
  <ul class="humans">
    <li>Gandalf</li>
    <li>Saruman</li>
    <li>Aragorn</li>
    <li>Boromir</li>
    <li>Faramir</li>
  </ul>
  <ul class="elves">
    <li>Legolas</li>
    <li>Glorfindel</li>
    <li>Elrond</li>
    <li>Arwen Evenstar</li>
  </ul>
  <ul class="enemies">
    <li>Sauron</li>
    <li>Nazgûl</li>
  </ul>
</div> */
}

const characters2 = document.querySelector('.characters');
const humansList = characters2.querySelector('.humans');
const humans = humansList.querySelectorAll('li');

const hobbitsList = characters2.querySelector('.hobbits');
const hobbits = hobbitsList.children;
const merry = hobbits[2];
const elvesList = merry.parentElement.nextElementSibling.nextElementSibling;
const glorfindel = elvesList.children[1];
const elrond = glorfindel.nextElementSibling;
const legolas = glorfindel.previousElementSibling;
const nazgul = document.querySelector('.enemies').chlidren[1];
const characters3 = nazgul.closest('.characters');
