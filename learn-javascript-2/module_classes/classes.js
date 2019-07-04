class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length > 2) {
      this._name = value;
    } else {
      console.log('Rejected');
    }
  }
}

var john = new Person('John');
console.log(john.name);
john.name = 'Le';
console.log(john.name);