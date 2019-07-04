const arr = [1, 2, 3, 4, 5, 7]

/**
 * forEach()
 * This method can help you to loop over array's items.
 */

arr.forEach(item => console.log(item))

/**
 * includes()
 * This method check if array includes the tem passed in the mthod.
 */

console.log(arr.includes(2))
console.log(arr.includes(7))

/**
 * filter()
 * This method create new array with only elements passed condition inside the provided function.
 */

const filtered = arr.filter(num => num > 3)

console.log(filtered)

/**
 * map()
 * This method create new array by calling the provided function every element.
 */

// add one to ever element
const oneAdded = arr.map(num => num + 1)

console.log(oneAdded)

/**
 * redue()
 * The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value - MDN
 */

const sum = arr.reduce((total, value) => total + value, 0)

console.log(sum)