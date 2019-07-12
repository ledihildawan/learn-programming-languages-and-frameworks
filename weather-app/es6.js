// // var
// // let
// // const
// // block scope

// // 1
// var shoppingCart = [
//   {
//     id: "231khjdfkja",
//     name: "FIFA 20",
//     price: 69.99
//   }
// ];

// if (true) {
//   var shoppingCart = [];
//   console.log(shoppingCart); // []
// }

// console.log(shoppingCart); // []

// // 2
// let shoppingCart = [
//   {
//     id: "231khjdfkja",
//     name: "FIFA 20",
//     price: 69.99
//   }
// ];

// if (true) {
//   let shoppingCart = [];
//   console.log(shoppingCart); // []
// }

// console.log(shoppingCart); // [{...}]

// // 3
// const shoppingCart = [
//   {
//     id: "231khjdfkja",
//     name: "FIFA 20",
//     price: 69.99
//   }
// ];

// shoppingCart = []; // Uncaught TypeError...

// Functions
const fn = () => console.log(this);
const h1 = document.querySelector("h1");

const clicked = () => {
  console.log(this);
}

function clicked2() {
  console.log(this);
}

h1.addEventListener("click", clicked.bind(this));

// Object literal extensions
const firstName = "ledi";
const lastName = "hildawan";

const id = "id";

const person = {
  [id]: "902ksfd",
  firstName,
  lastName
}

console.log(person);

// rest operator
const sum = (...numbers) => {
  let total = 0;
  
  numbers.forEach(function(number) {
    total += number;
  })

  return total;
};

console.log(sum(1, 2, 3, 4, 5));

// spread operator

// for of
const people = ["mark", "diane", "marry"];
for (let person of people) {
  console.log(person);
}
// template string

// destructuring
