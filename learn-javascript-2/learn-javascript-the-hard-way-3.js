function isValidEmail(email) {
  var regex = new RegExp('gmail.com|yahoo.com');
  return regex.test(email);
}

console.log(isValidEmail('ledihildawan@gmail.com'))
console.log(isValidEmail('ledihildawan@aio.com'))
console.log(isValidEmail('ledihildawan@live.com'))