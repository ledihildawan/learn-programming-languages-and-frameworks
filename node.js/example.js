function upcase(strings, ...values) {
  return values.map((name) => name[0].toUpperCase() + name.slice(1)).join(' ') + strings[2];
}

const person = {
  first: 'bredan',
  last: 'eich',
  age: 56,
  position: 'CEO of Brave Software',
};

const { first, last } = person;

console.log(upcase`${first} ${last} $is the creator of JavaScript!`);
