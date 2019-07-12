// Reverse a string
function reverseString(str) {
  return str.split().reverse().join('');
}
console.log(reverseString("ledi hildawan")); // nawadlih idel

// Palindrome
function isPalindrome(str) {
  const revStr = str.split('').reverse().join('');
  return str === revStr;
}
console.log("hello"); // false
console.log("mama"); // true

// Reverse an Integer
function reverseInt(int) {
  return parseInt(int.toString().split('').reverse().join(''));
}
console.log(reverseInt(45)); // 54

// Capitalize Letters
function capitalizeLetters(str) {
  return str.toLowerCase().split(' ').map(word => word[0].toUpperCase() + word.substr(1)).join(' ');
}

console.log(capitalizeLetters("ledi hildawan"));