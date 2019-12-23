(function(message) {
  console.log(message);
  // var a = 1;

  // if (a) {

  // }

  // single line comment
  /*
  Multiple line comments
*/
  /**
   * Multiple line comments
   */

  /**
   * Primitive Data Types:
   * Number: 2019, 1.5, NaN, Infinity
   * String: 'Hello', "Hello", `Hello`
   * Boolean: true, false
   * Null: null
   * Undefined: undefined
   * Symbol()
   */
  console.log(2019, 1.5);
  console.log(20 * "fadsfad");
  console.log(1 / 0);

  console.log("Hello", "Hello", `Hello`);

  console.log(true, false);

  console.log(null);

  console.log(undefined);

  console.log(Symbol());

  /**
   * Reference Data Types:
   * Object: { name: 'Denis', age: 30 }
   * - Array: [1, 2, 3]
   * - Function: function foo() {}
   * - Date: new Date()
   * ...
   */

  console.table({ name: "Denis", age: 30 });
  console.log([1, 2, 3, 4]);

  // var, let, const
  var name = "Denis";
  console.log(name);
  name = "Den";
  console.log(name);

  var age;
  console.log(age);
  age = 30;
  console.log(name);

  var $name = "Ivan";
  var _name = "Maks";
  // var 1name = ''

  var userAge = 30;
  var user_age = 20;
  var UserAge = 40;
  var userage = 10;

  var car = "bmw";
  var car = "audi";
  console.log(car);

  // console.log(nickname);
  let nickname = "dmgame";
  nickname = "dm";
  console.log(nickname);

  const firstName = "Tom";
  // firstName = 'John'
  // const lastName;

  console.log(firstName);

  let user = {
    name: "Denis",
    age: 30
  };

  user.age = 25;
  console.log(user);

  let value;

  // String to number
  value = Number("23");
  value = Number(false);
  value = Number(null);
  value = Number("false");
  value = Number([1, 2, 3]);

  // Boolean
  value = Boolean("hello");
  value = Boolean("");
  value = Boolean(-100);
  value = Boolean(0);
  value = Boolean(undefined);
  value = Boolean(null);
  value = Boolean({});
  value = Boolean([]);

  // Object to string
  value = String({ name: "Denis" });

  value = 30 + "" + undefined;
  value = 30 * "5";
  value = false + undefined;

  // Array to string
  value = String([1, 2, 3]);

  // Boolean to string
  value = String(false);

  // Number to string
  value = String(40);
  value = String(10 + 40);
  value = (40).toString();

  console.log(value);
  console.log(typeof value);

  // Numbers
  const num1 = 10;
  const num2 = 20;

  // + * - / %
  value = num1 + num2;
  value = value + 100;
  value += 100;
  // value = 5 % 2;
  value++;
  value--;
  ++value;
  --value;

  value = 0.6 + 0.7;
  value = parseFloat(value.toFixed(1));
  value = (0.6 * 10 + 0.7 * 10) / 10;

  // Math
  value = Math.PI;
  value = Math.random();
  value = Math.round(2.4);
  value = Math.ceil(2.1);
  value = Math.floor(2.9);
  value = Math.min(1, 2, 3, 4, 5, 0);

  value = Math.floor(Math.random() * 10 + 1);
  const arr = [
    "black",
    "red",
    "yello",
    "pink",
    "white",
    "blue",
    "orange",
    "green"
  ];
  value = Math.floor(Math.random() * arr.length);

  console.log(value, arr[value]);

  const lastName = "Mescheryakov";
  let str = `Hello my name is Denis`;

  value = firstName + lastName;
  value = firstName + " " + lastName;
  value += ` I am` + age;

  value = firstName.length;
  value = firstName[2];
  value = firstName[4];
  value = lastName[lastName.length - 1];
  value = firstName[firstName.length - 1];

  value = firstName.toUpperCase();
  value = firstName.concat(" ", lastName);

  value = str.indexOf("n", 10);
  value = str.indexOf("!");
  value = str.includes("DENIS");

  value = str.slice(0, 5);
  value = str.slice(0, -3);

  value = str.replace(`Denis`, `Den`);

  console.log(value);

  str = "Hello my name is " + firstName + " " + lastName;

  str =
    "<ul>" +
    "<li>First name: " +
    firstName +
    "</li>" +
    "<li>Last name: " +
    lastName +
    "</li>" +
    "<li>Age: " +
    age +
    "</li>" +
    "</ul>";

  console.log(str);

  str = `
  <ul>
    <li>First name: ${firstName}</li>
    <li>Last name: ${lastName}</li>
    <li>Age: ${age}</li>
    <li>5 + 5: ${5 + 5}</li>
  </ul>
`;

  document.body.innerHTML = str;

  // const user = {
  //   firstName: "Dennis",
  //   age: 30,
  //   isAdmin: true,
  //   email: "test@test.com",
  //   "user-address": {
  //     city: "Kharkiv"
  //   },
  //   skills: ["html", "css", "js"]
  // };

  user.firstName = "Dennis";
  user.isAdmin = true;
  user.email = "test@test.com";
  user["user-address"] = {};
  user["user-address"].city = "Kharkiv";
  user["user-address"][["city"]] = "Moscow";
  user.skills = ["html", "css", "js"];

  let prop = "skills";

  value = user.firstName;
  value = user["isAdmin"];
  value = user["user-address"];
  value = user["user-address"].city;
  value = user["user-address"]["city"];
  value = user[prop][0];

  user.firstName = "Den";

  value = user.firstName;

  user.info = "Some info";

  value = user.info;

  user["user-address"].city = "Kiev";
  user["user-address"].country = "Ukraine";

  user.plan = {};
  user.plan.basic = "basic";

  console.log(value);

  // >, <, >=, <=, ==, ===, !=, !==

  value = 1 > 2;
  value = 2 <= 2;
  value = 1 == 1;
  value = 1 == "1";
  value = 1 === "1";
  value = 1 != "1";
  value = 1 !== "1";
  value = "a" > "ab";
  value = "A".charCodeAt();

  console.log(value);

  // if (expression) {
  //   // actions
  // } else {
  //   // else actions
  // }

  value = 10;

  if (value) {
    console.log("some value", value);
  } else {
    console.log("else", value);
  }

  // || && !
  value = null;

  if (!value) {
    console.log(value);
  }

  value = [1];
  value = null;

  if (Array.isArray(value)) {
    console.log(value);
  } else {
    console.log("array is empty");
  }

  if (user.hasOwnProperty("name")) {
    console.log(user.name);
  } else {
    console.log("else");
  }

  // || &&
  // value  = 0 || 0 || null

  if (age < 16 || age > 65) {
    console.log("some actions");
  } else {
    console.log("else");
  }

  let serverNickname = "";
  nickname = serverNickname || "default nickname";

  console.log(nickname);

  value = 1 && 2 && 3;

  console.log(value);

  let productPrice = 10;

  if (productPrice >= 5 && productPrice <= 10) {
    console.log("Buy");
  } else {
    console.log("else");
  }

  value = 10;

  if (value < 10) {
    console.log("value < 10", value);
  } else if (value >= 10) {
    console.log("value >= 10", value);
  } else {
    console.log("else");
  }

  let a = 1;
  let b = 0;

  if (a > b) {
    b = 0;
  } else {
    b += 1;
  }

  // expression ? true statement : false statement
  // expression ? true statement : expression ? true statement : false statement

  b = a > 0 ? a : b + 1;
  b = a > 0 ? 2 : a < 0 ? 3 : 0;

  console.log(`b: ${b}`);

  let color = "yellow";

  switch (color) {
    case "yellow":
    case "red":
      console.log("Color is red || yellow");
      break;
    default:
      console.log("Default");
  }

  // while, do while, for, for of, for in

  let i = 10;
  while (i--) {
    console.log(i);
  }

  do {
    console.log("action");
  } while (i > 0);

  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      continue;
    }

    if (i === 6) {
      break;
    }

    console.log(i);
  }

  str = "Hello";
  let res = "";

  for (let i = 0; i < str.length; i++) {
    res += str[i] + "*";
  }

  console.log(res);

  let colors = ["white", "black", "yellow", "orange"];

  for (let i = 0; i < colors.length; i++) {
    colors[i] = colors[i].toUpperCase();
  }

  console.log(colors);

  let users = [
    {
      name: "Denis",
      age: 30
    },
    {
      name: "Max",
      age: 30
    },
    {
      name: "Marnie",
      age: 25
    }
  ];

  let usersObj = {};

  for (let i = 0; i < users.length; i++) {
    usersObj[users[i].name] = users[i];
  }

  for (let key in usersObj) {
    console.log(key);
    console.log(usersObj[key]);
  }

  for (let value of users) {
    console.log(value);
  }

  function sayHello(firstName = "Default", lastName = "Default") {
    console.log(firstName, lastName);
    console.log("Hello world");
    return `Hello ${firstName} ${lastName}`;
  }

  res = sayHello("Denis", "Mescheryakov");
  res2 = sayHello("Dima", "Mescheryakov") + "!";
  res3 = sayHello();
  console.log(res3);

  let x = 10;

  function foo(x) {
    x = 20;
    console.log(x);
    return x;
  }

  foo();

  console.log(x);

  function getObj(obj) {
    obj.name = "Den";
  }

  getObj(user);
  console.log(user);

  const numArr = [2, 32, 1234, 54, 323];

  value = numArr.length;
  // numArr.length = 0;
  // numArr.length = 100;

  value = Array.isArray(numArr);
  value = numArr[2];
  numArr[2] = 12;
  value = numArr.indexOf(32);
  value = numArr.push(100);
  value = numArr.pop();
  value = numArr.unshift(111);
  value = numArr.shift();
  value = numArr.slice(0, 2);
  numArr.splice(1, 0, "one", "two");
  value = numArr.reverse();
  value = numArr.concat(1, 2);
  value = numArr.join(" ");
  value = "Hello World".split(" ");

  console.log(value, numArr);

  foo.field = "Denis";

  console.log(foo.field);

  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].length);
  }

  console.log(newArr);

  const newArrTwo = [];

  for (let i = 0; i < arr.length; i++) {
    newArrTwo.push(arr[i].toUpperCase());
  }

  console.log(newArrTwo);

  const names = ["Denis", "Ivan", "Maks", "Olga"];

  function mapArray(arr, fn) {
    const res = [];

    for (let i = 0; i < arr.length; i++) {
      res.push(fn(arr[i]));
    }

    return res;
  }

  function nameLength(el) {
    console.log(el);
    return el.length;
  }

  function nameToUpperCase(el) {
    return el.toUpperCase();
  }

  const result = mapArray(names, nameLength);
  const resultTwo = mapArray(names, nameToUpperCase);

  console.log(result, resultTwo);

  function greeting(firstName) {
    return function(lastName) {
      return `Hello, ${firstName} ${lastName}`;
    };
  }

  // const testGreeting = greeting("denis");
  // const fullName = testGreeting("Mescheryakov");
  const fullName = greeting("denis")("Mescheryakov");
  console.log(fullName);

  function question(job) {
    const jobDirectory = {
      developer: "what is JavaScript?",
      teacher: "where did you teched before you get in here?"
    };

    return function(name) {
      return `${name}, ${jobDirectory[job]}`;
    };
  }

  console.log(question("developer")("Denis"));
  console.log(question("teacher")("Olga"));

  users = [
    {
      _id: "5cdce6ce338171bb473d2855",
      index: 0,
      isActive: false,
      balance: 2397.64,
      age: 39,
      name: "Lucile Finley",
      gender: "female",
      company: "ZOXY",
      email: "lucilefinley@zoxy.com",
      phone: "+1 (842) 566-3328",
      registered: "2015-07-12T09:39:03 -03:00"
    },
    {
      _id: "5cdce6ce0aa8d071fa4f4cc5",
      index: 1,
      isActive: true,
      balance: 2608.48,
      age: 33,
      name: "Woodward Grimes",
      gender: "male",
      company: "FORTEAN",
      email: "woodwardgrimes@fortean.com",
      phone: "+1 (960) 436-3138",
      registered: "2014-09-08T03:24:39 -03:00"
    },
    {
      _id: "5cdce6ce103de120d32d6fe4",
      index: 2,
      isActive: true,
      balance: 1699.99,
      age: 25,
      name: "Robinson Coleman",
      gender: "male",
      company: "GENMOM",
      email: "robinsoncoleman@genmom.com",
      phone: "+1 (852) 543-3171",
      registered: "2019-04-23T08:24:58 -03:00"
    },
    {
      _id: "5cdce6cebada7a418d8ccb3d",
      index: 3,
      isActive: true,
      balance: 2621.84,
      age: 25,
      name: "Austin Benton",
      gender: "male",
      company: "ZILIDIUM",
      email: "austinbenton@zilidium.com",
      phone: "+1 (977) 573-2627",
      registered: "2016-08-02T10:08:24 -03:00"
    },
    {
      _id: "5cdce6ced81fe99596d9cef5",
      index: 4,
      isActive: true,
      balance: 1297.31,
      age: 37,
      name: "Casandra Stout",
      gender: "female",
      company: "ANACHO",
      email: "casandrastout@anacho.com",
      phone: "+1 (929) 465-3804",
      registered: "2018-04-14T11:27:26 -03:00"
    },
    {
      _id: "5cdce6ce6c3ae6c4d6f39e88",
      index: 5,
      isActive: false,
      balance: 2165.49,
      age: 20,
      name: "Valencia Carrillo",
      gender: "male",
      company: "XEREX",
      email: "valenciacarrillo@xerex.com",
      phone: "+1 (977) 522-3378",
      registered: "2014-02-14T11:45:27 -02:00"
    }
  ];

  // forEach
  users.forEach((user, i, arr) => {
    console.log(user, i, arr);
  });

  // filter
  const userLess30 = users.filter(user => user.age < 30);
  console.log(userLess30);
  const activeUsers = users.filter(user => user.isActive);
  console.log(activeUsers);

  // map
  const usersName = users.map(user => user.name);
  // const usersName = users.map(user => ({ name: user.name, age: user.age }));
  console.log(usersName);

  // reduce
  const totalBalance = users.reduce((acc, user) => (acc += user.balance), 0);
  console.log(totalBalance);

  usersObj = users.reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {});

  console.log(usersObj);

  // some/every
  const isMale = users.some(user => user.gender === "male");
  const isAllMale = users.every(user => user.gender === "male");
  const isAll18 = users.every(user => user.age > 18);
  console.log(isMale, isAllMale, isAll18);

  // find
  user = users.find(user => user.name === "Valencia Carrillo");
  console.log(user);

  // sort
  const strArr = ["Denis", "Bill", "Anna"];
  console.log(numArr.sort((a, b) => a - b));
  console.log(numArr.sort((a, b) => b - a));
})("Hello");

function getThis() {
  console.log(this);
}

function getName() {
  console.log(this.name);
  return this;
}

function getPrice(currency = "$") {
  console.log(currency + this.price);
  return this;
}

getThis();
window.getThis();
console.log(window.getThis);

const prodOne = {
  name: "Intel",
  price: 100,
  getPrice,
  getName: function() {
    console.log(this.name);
  },
  info: {
    information: ["2.3ghz"],
    getInfo: function() {
      console.log(this);
    }
  }
};

prodOne.getName();
prodOne.getPrice();
prodOne.info.getInfo();

const prodTwo = {
  name: "AMD",
  price: 50,
  getPrice
};

prodTwo.getName = prodOne.getName;
prodTwo.getPrice();
prodTwo.getName();

str = "Hello world";

const reverseStr = str
  .split("")
  .reverse()
  .join("");

console.log(reverseStr);

const prodThree = {
  name: "ARM",
  price: 200,
  getPrice,
  getName
};

prodThree.getName().getPrice();

getPrice.call(prodThree, "*");
getPrice.apply(prodThree, ["*"]);

setTimeout(prodThree.getPrice.bind(prodThree, "*"), 1000);

const ul = document.querySelector("ul");
const lis = document.querySelectorAll("li");
const body = document.getElementsByTagName("body");
console.dir(body);
console.log(lis);

// Convert NodeList to Array
console.log(Array.from(lis));
console.log(Array.prototype.slice.call(lis));
console.log([...lis]);

console.log(ul.parentElement);
console.log(lis[0].closest("ul"));

ul.classList.add("list-container", "list-container--primary");
ul.classList.remove("list-container");
// ul.classList.contains("list-container");
// ul.classList.toggle("list-container");

ul.setAttribute("id", "list");
ul.setAttribute("data-id", "fsa91k2390fas");
ul.removeAttribute("id");
console.log(ul.getAttribute("id"));
console.log(ul.dataset.id);
console.dir(ul);

// ul.innerHTML = '<span>text</span>';
// ul.textContent = "<span>new text</span>";
// ul.appendChild("<span>Append</span>");
ul.insertAdjacentHTML("beforebegin", "<h2>Title</h2>");

const h2 = document.querySelector("h2");
h2.innerHTML += " <span>new text</span>";
const h2Span = document.querySelector("h2 span");
console.log(h2Span);
h2.innerHTML += " <span>new text 2</span>";
h2Span.innerHTML = "asdf";

const span = document.createElement("span");
span.textContent = "span created by createElement";
span.classList.add("myClass");
console.log(span);

h2.appendChild(span);

let colors = ["white", "black", "yellow", "orange"];
const fragment = document.createDocumentFragment();
colors.forEach(color => {
  const item = document.createElement("div");
  item.classList.add(`bg-${color}`);
  item.style.backgroundColor = color;
  item.textContent = color;
  fragment.appendChild(item);
});

document.body.appendChild(fragment);

// h2.remove();
// h2.parentElement.removeChild(h2);

const btnEl = document.createElement("button");
const aEl = document.createElement("a");

btnEl.textContent = "Click";
aEl.href = "#";
aEl.textContent = "Click link";

document.body.appendChild(aEl);
document.body.appendChild(btnEl);

const button = document.querySelector("button");
const link = document.querySelector("a");

function clickHandler(e) {
  e.preventDefault();
  console.log(this);
  console.log("click");
}

button.addEventListener("click", e => {
  console.log(this);
  console.log(e);
  const divEl = document.createElement("div");
  const buttonEl = document.createElement("button");
  divEl.textContent = Math.random();
  buttonEl.textContent = "button";
  divEl.appendChild(buttonEl);
  document.body.appendChild(divEl);
});

link.addEventListener("click", clickHandler);
// link.removeEventListener("click", clickHandler);

document.body.addEventListener("click", e => {
  console.dir(e.target);
  if (e.target.tagName === "BUTTON") {
    console.log("button clicked");
  }
});
