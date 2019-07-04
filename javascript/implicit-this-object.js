var person = {
  firstName: 'John',
  sayHi: function() {
    return 'Hi ' + this.firstName
  },
  determineContext: function() {
    return this === person
  }
}

person.sayHi()

person.determineContext()