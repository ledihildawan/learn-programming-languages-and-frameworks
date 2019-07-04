function findLargestNumber(...num) {
  let tempCollection = [...num]
  let currNum = 0

  for (let i = 0; i < tempCollection.length; i++) {
    if (tempCollection[i] > currNum) {
      currNum = tempCollection[i]
    }
  }

  let biggestNum = currNum

  return biggestNum
}

console.log(findLargestNumber(100, 50, 30, 999, 0));

function findOddNum(...num) {
  let numColl = [...num]
  let numOddColl = []

  for (let i = 0; i < numColl.length; i++) {
    if (numColl[i] % 2 !== 0) {
      numOddColl.push(numColl[i])
    }
  }

  return numOddColl
}

console.log(findOddNum(1, 5, 8, 10, 11))

let date = new Date()
let year = date.getFullYear()

function calculateAge(yearBirth, currentYear = year) {
  const age = currentYear - yearBirth

  return `Your age is ${age} years old.`
}

console.log(calculateAge(1997));