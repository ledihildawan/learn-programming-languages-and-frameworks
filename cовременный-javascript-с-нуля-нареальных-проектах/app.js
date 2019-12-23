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

  const user = {
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

  const users = [
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

  const usersObj = {};

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
})("Hello");
