function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.bark = function() {
    console.log(this.name + ' just barked!');
  }
}

var rusty = new Dog('Rusty', 3);
var fido = new Dog('Fido', 1);

rusty.bark();
fido.bark();


// new + call / apply
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}

function Motorcycle(make, model, year) {
  Car.call(this, make, model, year);
  this.numWheels = 2;
}
function Motorcycle(make, model, year) { 
  Car.apply(this, [make, model, year]);
  this.numWheels = 2;
}
function Motorcycle(make, model, year) { 
  Car.apply(this, arguments);
  this.numWheels = 2;
}