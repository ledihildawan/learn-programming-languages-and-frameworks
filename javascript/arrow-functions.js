const car = {
  color: "red",
  getSummary: function () {
    return `This car is ${this.color}`;
  }
}

const car2 = {
  color: "green",
  getSummary: () => {
    return `This car is ${this.color}`;
  }
};

const car3 = {
  color: "blue",
  getSummary() {
    return `This car is ${this.color}`;
  }
}

console.log(car.getSummary());
// This car is red
console.log(car2.getSummary());
// This car is undefined
console.log(car3.getSummary());
// This car is blue