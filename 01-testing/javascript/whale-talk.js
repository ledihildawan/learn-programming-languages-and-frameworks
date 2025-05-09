const input = "turpentine and turtles";
const vowels = ["a", "e", "i", "o", "u"];
const resultArray = [];

for (const char of input) {
  if (vowels.includes(char)) {
    resultArray.push(char);

    if (char === "e" || char === "u") {
      resultArray.push(char);
    }
  }
}

console.log(resultArray.join("").toUpperCase());