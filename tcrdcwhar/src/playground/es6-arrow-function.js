const square = function(x) {
  return x * x;
};

// const squareArrow = (x) => {
//   return x * x;
// }

const squareArrow = x => x * x;

console.log(square(8));
console.log(squareArrow(8));

const getFirstName = function(fullName) {
  return fullName.split(" ")[0];
};

const getFirstNameArrow = fullName => fullName.split(" ")[0];

console.log(getFirstName("Ledi Hildawan"));
console.log(getFirstNameArrow("Ledi Hildawan"));
