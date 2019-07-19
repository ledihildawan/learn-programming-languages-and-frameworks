// forEach, filter, every, some, reduce
let numbers = [10, 20, -10, 2, -5];
let users = [
  {
    name: 'john',
    age: 30,
    gender: 'male'
  },
  {
    name: 'jane',
    age: 25,
    gender: 'female'
  },
  {
    name: 'lena',
    age: 21,
    gender: 'female'
  }
];

// filter
let res = numbers.filter((number, idx, arr) => {
  return number >= 0;
});

res = users.filter(user => user.gender === 'male');

// Map
let mapRes = users.map(user => user.name);

mapRes = users.map(user => {
  user.age = user.age + ' years old';
  return user;
});

console.log(mapRes);

// reduce
let total = users.reduce((acc, curr) => ((acc.age + curr.age) / users.length));

const average = numbers.reduce((acc, curr) => (acc + curr) / numbers.length);
console.log(average);

console.log(total);

// 2
const simpleShopingCart = [10, 20, 25, 5, 10];
const shoppingCart = [
  {
    sku: "1234",
    price: 10,
    type: "t-shirt"
  },
  {
    sku: "12343132",
    price: 16,
    type: "tutorial"
  },
  {
    sku: "122334",
    price: 32,
    type: "rice cooker"
  },
  {
    sku: "3321",
    price: 20,
    type: "book"
  },
  {
    sku: "12343132",
    price: 70,
    type: "tutorial"
  },
];

// map
// iterates over array, perform function each item
// returns new array
// returns some or less amount of items in array

let discountCart = simpleShopingCart.map(value => value * .75);
discountCart = shoppingCart.map(value => ({ ...value, salePrice: value.price * .75 }));

console.log(discountCart);

// map
// iterates over array, determines what is filter
// returns new array
// returns some or less amount of items in array

let filteredCart = simpleShopingCart.filter(value => value <= 10);
filteredCart = shoppingCart
  .filter(({ type }) => type === 'tutorial')
  .filter(product => product.price > 20);

console.log(filteredCart);

// reduce
// iterates over value, uses value, to output one value
// outputs single value

const total2 = simpleShopingCart.reduce((acc, curr) => acc + curr);
console.log(total2);

// every
// some
// forEach