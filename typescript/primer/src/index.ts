let names = ['Hat', 'Boots', 'Gloves'];
let prices = [];

prices.push(100);
prices.push('100');
prices.push(50.25);

console.log(`First Item: ${names[0]}: ${prices[0]}`);

let sumPrices = (...numbers) => numbers.reduce((total, val) => total + (Number.isNaN(Number(val)) ? 0 : Number(val)));
let totalPrice = sumPrices(...prices);

console.log(`Total: ${totalPrice} ${typeof totalPrice}`);

let combinedArray = [...names, ...prices];

combinedArray.forEach((element) => console.log(`Combined Array Element: ${element}`));

let [one, two] = names;
console.log(`One: ${one}, Two: ${two}`);

let [, , three] = names;
console.log(`Three: ${three}`);
let [, ...highest] = prices.sort((a, b) => a - b);
highest.forEach((price) => console.log(`High price: ${price}`));
