const fs = require("fs").promises;

const contents = { aa: 12, bb: 21 };

fs.open("myfile1.txt", "a+").then((data) =>
  data.write(JSON.stringify(contents))
);

console.log("5");
console.log("JavaScript");
console.log(2011);
console.log("Woohoo! I love to code! #codecademy");
console.log(20.49);
