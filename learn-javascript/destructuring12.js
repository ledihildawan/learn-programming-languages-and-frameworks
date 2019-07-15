// let numbers = [1, 2, 3];

// let [a, b] = numbers;
// let [a, ...b] = numbers;
// let [a = 'Default', b, c, d = 1] = numbers;

// let a = 5;
// let b = 10;

// [b, a] = [a, b];

// let [a, b] = [1, 2, 3];
// let [a,, b] = [1, 2, 3];

let obj = {
  name: 'Max',
  age: 27,
  greet: function() {
    console.log('Hello there!');
  }
};

let { name, greet: hello } = obj;

hello();

// console.log(b);
// console.log(a);