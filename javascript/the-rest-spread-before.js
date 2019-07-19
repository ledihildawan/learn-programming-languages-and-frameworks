// This operator makes copying and merging arrays a lot simpler. Rather than calling the concat() or slice() method (REST)

const arr1 = [10, 20, 30]

// make a copy of arr1
const copy = [...arr1]
const copyBefore = [].concat(arr1)

console.log(copy)
console.log(copyBefore)

const arr2 = [40, 50]

const merge = [...arr1, ...arr2]
const mergeBefore = arr1.concat(arr2)

console.log(merge)
console.log(mergeBefore)

// The spread operator also comes in handy in situations where an array must be passed in as separate arguments to a function.

const arr = [10, 20, 30]
console.log(Math.max(...arr))

const obj1 = {
  a: 10,
  b: 20
}

const obj2 = {
  ...obj1,
  a:20
}

console.log(obj2)