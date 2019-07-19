import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    getPersonDiscription() {
      return `${this.name} is ${this.age} year(s) old`;
    }
  }

  class Programmer extends Person {
    constructor(name, language) {
      super(name);
      this.language = language;
    }

    getGreeting() {
      return `Hi! I'm ${this.name} a ${this.language} developer`;
    }
  }

  const ledi = new Programmer('Ledi', 'JavaScript');
  console.log(ledi.getGreeting());
});