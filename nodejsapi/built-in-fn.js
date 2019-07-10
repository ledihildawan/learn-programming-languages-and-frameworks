setTimeout(function() {
  console.log("Hello");
}, 2000);

let timer = 1;
let sayHelloFiveTimes = setInterval(function() {
  if (timer === 5) {
    clearInterval(sayHelloFiveTimes);
  }
  console.log("Hello", timer);
  timer++;
}, 1000);

setTimeout(function() {
  clearInterval(sayHelloFiveTimes);
}, 2500);

// Date
// month start from 0
var today = new Date();

// Regular expression are pattern use to match charcter combination in string
var string = "abc"; 
var pattern =  /ab/;
console.log(pattern.exec(string));
console.log(pattern.test(string));
console.log(string.match(pattern));

// traversing dom
firstElementChild
lastElementChild
nextElementSibling
parentElement