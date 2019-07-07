const randomNum = (lower, upper) => Math.floor(Math.random() * (upper - lower + 1) + lower);

const answer = randomNum(1, 1000);
let gessAnswer;

let i = 0;

while (gessAnswer !== answer) {
  gessAnswer = randomNum(1, 1000);
  i++;
}

console.log(`Butuh ${i}x percobaan untuk berhasil`);