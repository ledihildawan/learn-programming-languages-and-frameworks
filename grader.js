function average(scores) {
  let total = 0

  for (let i = 0; i < scores.length; i++)
    total += scores[i]

  let avg = total / scores.length

  return Math.round(avg)
}

const score1 = average([90, 98, 89, 100, 100, 86, 94])
const score2 = average([40, 65, 77,  82, 80, 54, 73, 63, 95, 49])

console.log(score1)
console.log(score2)