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