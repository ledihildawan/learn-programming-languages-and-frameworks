class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  sayHello() {
    return `Hello ${this.firstName} ${this.lastName}`
  }
}

class Student extends Person {
  constructor(year) {
    super()
    this.year = year
  }
}

const ledi = new Student('ledi', 'hildawan', 2014)

console.log(ledi.sayHello());
console.log(ledi.year);