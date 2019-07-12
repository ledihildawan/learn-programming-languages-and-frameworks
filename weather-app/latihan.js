// Repeat string

function repeatString(str, num) {
  let result = '';
  let i = 1;

  while (i < num) {
    if (!isNaN(num) && !(num < 0)) {
      result += str;
    } else {
      return undefined;
      break;
    }
    i++;
  }

  return result;
}

console.log(repeatString("hello", "apa"));