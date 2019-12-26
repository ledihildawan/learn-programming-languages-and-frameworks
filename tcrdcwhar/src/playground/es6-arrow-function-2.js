// arguments object - no longer bound with arrow functions

const add = (a, b) => {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1, 1001));

// this keyword - no longer bound

const user = {
  name: "Ledi Hildawan",
  cities: ["Samarinda", "Malang", "Kaledupa", "Bau-bau", "Makassar"],
  printPlacesLived() {
    return this.cities.map(city => `${this.name} has lived in ${city}`);
  }
};

console.log(user.printPlacesLived());

const multipier = {
  numbers: [1, 2, 3],
  multipleBy: 3,
  multiply() {
    return this.numbers.map(number => number * this.multipleBy);
  }
};

console.log(multipier.multiply());
