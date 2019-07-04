// function applyDiscount(cost, discount) {
//   discount = discount || .10;

//   return cost - (cost * discount);
// }

function defaultDiscountRate() {
  return .50;
}

function applyDiscount(cost, discount = defaultDiscountRate()) {
  return cost - (cost * discount);
}

console.log(applyDiscount(100))