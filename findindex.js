function findIndex(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[ i], i, arr)) {
      return i
    }
  }
  return -1
}

const arr = [5, 11, 13, 8, 6, 7]
const findFirstEven = findIndex(arr, function(num, index, array) {
  return num % 6 === 0
})
console.log(findFirstEven)