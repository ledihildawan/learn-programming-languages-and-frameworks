// Object Shorthand

function getPerson() {
  let name = 'John';
  let age = 25;

  return {
    name,
    age,
    greet() {
      return `Hello ${this.name}`;
    }
  }
}

console.log(getPerson().greet());

// Object Destructuring
function getData({name, age}) {
  console.log(`Hello ${name}, You are ${age}`);
}

getData({
  name: 'Karen',
  age: 32
});