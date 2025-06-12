import { itemsBoughtArr } from '/itemsBoughtArr.js';

function calculateTotalCost(itemsBoughtArr, discount) {
  const total = itemsBoughtArr.reduce((total, currentItem) => {
    // if (!discount) {
    //     discount = 10
    // }
    return total + currentItem.priceUSD;
  }, 0);
  return total - discount;
}

console.log(calculateTotalCost(itemsBoughtArr));
