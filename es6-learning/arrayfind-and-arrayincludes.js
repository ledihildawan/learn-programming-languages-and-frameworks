console.log([2, 4, 6, 8, 10].includes(25));

// find first element
console.log([2, 4, 6, 8, 10].find(item => item % 2 === 0));

class User {
  constructor(name, isAdmin) {
    this.name = name;
    this.isAdmin = isAdmin;
  }
}

const users = [
  new User('Jeffrey', false),
  new User('Jane', true),
  new User('Jack', false)
];

console.log(users.find(user => user.isAdmin).name);

// fill
// keys
// values
// entries

let items = ['jeff', 'jordan', 'way'].entries();

for (let name of items) console.log(name);