let name = 'Anna';
let age = 25;

let ageField = "age";

let obj = {
  "name": 'Max',
  [ageField]: 28,
  "greet me"() {
    console.log(this.name + ', ' + this.age);
  }
};

console.log(obj[ageField]);